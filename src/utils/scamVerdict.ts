export type ThreatCheck = {
  source: string;
  risk?: string;
  skipped?: boolean;
  error?: string;
};

export type ScamCheckInput = {
  blacklisted: boolean;
  blacklistLoaded: boolean;
  blacklistFresh: boolean;
  homographRisk: boolean;
  goPlusRisky: boolean;
  goPlusChecked: boolean;
  isAddress: boolean;
  threatChecks: ThreatCheck[];
};

export function classifyScamCheck(input: ScamCheckInput) {
  const successfulSources = input.threatChecks.filter((check) => !check.skipped && !check.error && ['low', 'high', 'critical'].includes(check.risk || ''));
  const unavailableSources = input.threatChecks.filter((check) => check.skipped || check.error || check.risk === 'unknown').map((check) => check.source);
  const riskyExternal = successfulSources.some((check) => check.risk === 'critical' || check.risk === 'high');
  const risky = input.blacklisted || input.homographRisk || input.goPlusRisky || riskyExternal;

  const incomplete = !input.blacklistLoaded || !input.blacklistFresh ||
    (input.isAddress ? !input.goPlusChecked : successfulSources.length === 0 || unavailableSources.length > 0);

  return {
    status: risky ? 'risky' as const : incomplete ? 'incomplete' as const : 'not_found' as const,
    successfulSources: successfulSources.map((check) => check.source),
    unavailableSources,
    incomplete,
  };
}
