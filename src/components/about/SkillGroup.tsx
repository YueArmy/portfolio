import { Badge } from '@/components/ui/Badge';

interface SkillGroupProps {
  category: string;
  skills: string[];
}

export function SkillGroup({ category, skills }: SkillGroupProps) {
  return (
    <div className="space-y-3">
      <h3
        className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>
    </div>
  );
}
