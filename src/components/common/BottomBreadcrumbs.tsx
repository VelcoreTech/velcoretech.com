import { Link } from "react-router-dom";

type Crumb = {
  name: string;
  to?: string;
};

interface Props {
  items: Crumb[];
}

export function BottomBreadcrumbs({ items }: Props) {
  return (
    <section className="border-t border-border bg-background py-10">
      <div className="container-tight">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {items.map((item, index) => (
              <li key={`${item.name}-${index}`} className="flex items-center gap-2">
                {item.to ? (
                  <Link
                    to={item.to}
                    className="hover:underline hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">
                    {item.name}
                  </span>
                )}
                {index < items.length - 1 && <span>/</span>}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}