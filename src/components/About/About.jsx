import author from "../../images/author.png"

function About() {
  return (
    <section className="about">
      <img className="about__photo" src={author} alt="Foto del autor" />
      <div className="about__info">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Hi, I'm Aleja, a full-stack web developer based in Bogotá, Colombia. I
          build responsive web applications with React and Vite on the front
          end, and RESTful APIs with Node.js, Express, and MongoDB on the back
          end, including JWT authentication and secure data handling. I enjoy
          turning designs into clean, functional products and deploying them to
          production.
        </p>
        <p className="about__text">
          I can help you turn an idea or a design into a fast, user-friendly
          website or web app, from the interface to the database and deployment.
        </p>
      </div>
    </section>
  );
}

export default About;
