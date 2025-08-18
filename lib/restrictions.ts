export type TeamRule = { noLaterThan?: string; maxWeekdaySessions?: number; blockedDays?: number[]; };
export type RuleSet = Record<string, TeamRule>;
export function validateSlot(rule: TeamRule, weekday: number, startTime: string){
  const issues:string[]=[];
  if (rule.blockedDays?.includes(weekday)) issues.push('Day is blocked.');
  if (rule.noLaterThan && startTime > rule.noLaterThan) issues.push(`Starts after ${rule.noLaterThan}.`);
  return issues;
}
