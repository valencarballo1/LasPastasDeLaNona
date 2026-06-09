import { SectionTitle } from "../shared/SectionTitle";
import { weeklyMenu } from "./weekly-menu.content";

export function WeeklyMenu() {
  return (
    <section className="contentSection contentSection--cream" id="menu-semanal">
      <SectionTitle
        eyebrow="Especiales de la semana"
        title="Platos caseros para volver más de una vez"
        subtitle="Una selección simple para destacar novedades, promociones o platos recomendados según el día. Los precios quedan como placeholders claros hasta cargar los valores reales."
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
