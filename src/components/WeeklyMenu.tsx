import { weeklyMenu } from "../data/site-content";
import { SectionTitle } from "./SectionTitle";

export function WeeklyMenu() {
  return (
    <section className="contentSection contentSection--cream" id="semanal">
      <SectionTitle
        eyebrow="Menú semanal"
        title="Especiales para organizar tu semana"
        subtitle="Bloques editables para destacar platos, promociones o novedades de cada día."
      />
      <div className="weeklyGrid">
        {weeklyMenu.map((item) => (
          <article className="weeklyCard" key={item.day}>
            <span>{item.day}</span>
            <h3>{item.dish}</h3>
            <p>{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
