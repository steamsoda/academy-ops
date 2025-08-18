export type Role = 'DIRECTOR'|'COORDINATOR'|'COACH'|'REFEREE'|'PARENT'|'FINANCE';
type Action = 'read'|'create'|'update'|'delete'|'manage';
export function ability(user?: { role?: Role }) {
  const role = user?.role ?? 'COACH';
  const can = (action: Action, subject: string) => {
    if (role === 'DIRECTOR') return true;
    if (role === 'FINANCE' && ['payments','reports'].includes(subject)) return true;
    if (role === 'COORDINATOR' && ['players','teams','schedule','matches','attendance'].includes(subject)) return true;
    if (role === 'COACH' && ['players','schedule','attendance','matches','compliance'].includes(subject)) return action !== 'delete';
    if (role === 'REFEREE' && subject === 'matches') return action === 'read' || action === 'update';
    if (role === 'PARENT' && ['players','schedule','payments'].includes(subject)) return action === 'read';
    return false;
  };
  return { can };
}
