import React from "react";
import BreadcrumbsNav from "../components/BreadcrumbsNav";

const OurStoryPage = () => {
  const links = [{ label: "Home", to: "/" }];

  return (
    <div className="w-screen bg-[#f0e0d0] px-6 py-2">
      <BreadcrumbsNav links={links} currentPage="Our Story" />
      <div className=" max-w-5xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 text-[#62483a]">OUR STORY</h1>
          <h2 className="mb-4 font-bold text-[#62483a]">
            Our Collective Journey of Artistic Excellence
          </h2>

          <p className=" text-justify text-lg max-w-3xl mx-auto text-[#62483a]">
            In 2025, a shared vision united five individuals with complementary
            expertise: Tanut "Nut" Ketrueang, Poramate "Mate" Prompun, Kanokwan
            "Ling" Sae-tae, Suphol "Aom" Inphrom, and Suntarinth "Tib"
            Singhasinpongsaporn. Their collective observation was clear—the fine
            art market lacked a sophisticated digital platform that could serve
            both discerning collectors and exceptional artists with equal
            dedication. The traditional art marketplace presented significant
            barriers: opacity in pricing, limited accessibility to premier
            works, and insufficient authentication standards. For collectors,
            finding investment-worthy pieces often required exclusive
            connections. For artists, reaching high-value patrons meant
            navigating complex gallery relationships. Collectico was conceived
            as the elegant solution to these challenges—a refined digital
            marketplace where exceptional art and discerning collectors
            converge.
          </p>
        </header>

        <div className=" space-y-16 ">
          <section className=" bg-white rounded-lg shadow-lg">
            <div className=" text-[#62483a] p-8">
              <h2 className="text-2xl font-bold">
                COLLECTICO DEVELOPMENT PROCESS
              </h2>
            </div>
            <div className="p-8 text-[#62483a]">
              <ul className="space-y-4">
                <li className="flex">
                  <div>
                    <h3 className="font-bold">
                      SPRINT 1: FOUNDATION & DESIGN{" "}
                    </h3>
                    <p className="text-justify">
                      During our initial sprint, we established the visual and
                      structural foundation of Collectico. We meticulously
                      crafted the platform's aesthetic identity through careful
                      color palette selection and typography that reflected the
                      premium nature of fine art commerce. Our team developed
                      comprehensive wireframes to map the user journey, ensuring
                      an intuitive navigation experience for both collectors and
                      artists. We created detailed ER diagrams and schema
                      designs to architect a database structure capable of
                      handling complex artwork metadata and authentication
                      records. The fully coded static website using HTML and CSS
                      served as our tangible blueprint, allowing stakeholders to
                      visualize the elegant interface that would soon come to
                      life. This phase culminated in a cohesive design system
                      that would guide our development through subsequent
                      sprints.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">
                      SPRINT 2: DYNAMIC INTERACTION & FUNCTIONALITY{" "}
                    </h3>
                    <p className="text-justify">
                      The second sprint transformed our static foundation into a
                      dynamic, interactive experience using React. We
                      deconstructed our monolithic HTML/CSS structure into
                      modular, reusable React components that prioritized
                      performance and maintainability. Our development team
                      implemented state management solutions to handle the
                      complex data flows between user interactions and content
                      display. We integrated responsive design principles to
                      ensure the premium experience translated seamlessly across
                      all devices, from gallery-sized displays to mobile
                      screens. Authentication flows, search functionality, and
                      filtering systems were implemented to allow collectors to
                      discover and engage with artworks efficiently. This sprint
                      delivered a fully interactive front-end that responded
                      fluidly to user input while maintaining the elegant
                      aesthetic established in our design phase.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">
                      SPRINT 3: INTEGRATION & DEPLOYMENT{" "}
                    </h3>
                    <p className="text-justify">
                      Our final sprint focused on connecting our React front-end
                      with a robust Node.js and MongoDB back-end to create a
                      complete marketplace ecosystem. We implemented secure
                      payment processing systems with multiple options suitable
                      for high-value transactions including escrow services for
                      exceptional pieces. Our engineering team developed
                      comprehensive APIs for artwork management, user
                      authentication, and transaction processing, with thorough
                      documentation to support future development. We
                      implemented rigorous testing protocols across the full
                      application stack to ensure stability and security
                      appropriate for a platform handling valuable assets. The
                      sprint culminated in the successful deployment of
                      Collectico to a production environment, making the
                      platform accessible to our target audience of discerning
                      collectors and distinguished artists. This final phase
                      transformed Collectico from a concept to a functioning
                      marketplace poised to elevate the digital art acquisition
                      experience.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OurStoryPage;
