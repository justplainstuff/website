export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon?: string;
  title?: string;
  description?: string | Promise<string>;
}) {
  return (
    <div class="bg-base-200 p-4 rounded-lg shadow-sm">
      <div class="flex items-center space-x-2">
        {icon && <div class="text-xl mb-2">{icon}</div>}
        {title && <h3 class="font-bold mb-1">{title}</h3>}
      </div>
      {description && <p class="text-sm text-base-content/70">{description}</p>}
    </div>
  );
}
