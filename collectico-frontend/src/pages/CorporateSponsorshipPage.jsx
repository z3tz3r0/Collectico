import React from "react";
import BreadcrumbsNav from "../components/BreadcrumbsNav";

const CorporateSponsorshipPage = () => {
  const links = [{ label: "Home", to: "/" }];
  return (
    <div className="w-screen bg-[#f0e0d0] px-4 py-2">
      <BreadcrumbsNav links={links} currentPage="Coporate Sponsorship" />
      <div className=" max-w-5xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-8 text-[#62483a]">
            OUR CORPORATE SPONSORS
          </h1>

          <p className="text-lg max-w-3xl mx-auto text-[#55453c] font-bold">
            Generation Thailand & GENKX: Transforming Digital Art Commerce
          </p>
        </header>

        <div className=" ">
          {/* VISIONARY ALLIANCE */}
          <section className=" bg-white rounded-lg shadow-lg">
            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold mb-4">VISIONARY ALLIANCE</h2>
              <p>
                Collectico proudly acknowledges the generous sponsorship and
                technological support provided by Generation Thailand and GENKX,
                two pioneering organizations at the forefront of Thailand's
                digital transformation. Their investment in our platform
                exemplifies a shared commitment to preserving artistic heritage
                through innovative technology.
              </p>
            </div>
            {/*GENERATION THAILAND */}
            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold mb-4">GENERATION THAILAND</h2>
              <p>
                Generation Thailand has been instrumental in Collectico's
                development as a premier digital marketplace for fine art. As an
                organization dedicated to transforming education-to-employment
                systems, Generation Thailand brings invaluable expertise in
                developing digital talent and fostering technological
                innovation.
              </p>
            </div>

            <div className="p-6 text-[#62483a]">
              <p className="mb-4">Their contribution to Collectico includes:</p>
              <ul className="space-y-4">
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Strategic technological advisory on platform development
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3">•</span>
                  <div>
                    <h3>Access to a network of skilled software developers</h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>Digital infrastructure support and optimization</h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      User experience enhancement through advanced methodologies
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>Commitment to sustainable technological practices</h3>
                  </div>
                </li>
              </ul>
            </div>

            {/*GENKX INNOVATION PROGRAM */}
            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold mb-4">
                GENKX INNOVATION PROGRAM
              </h2>
              <p>
                The GENKX program, a collaboration between Generation Thailand
                and King Mongkut's University of Technology Thonburi (KMUTT),
                has provided Collectico with access to cutting-edge
                technological solutions tailored specifically for the digital
                art marketplace.
              </p>
            </div>

            <div className="p-6 text-[#62483a]">
              <p className="mb-4">
                GENKX's contributions to our platform encompass:
              </p>
              <ul className="space-y-4">
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Custom development of our authentication and provenance
                      verification systems
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3">•</span>
                  <div>
                    <h3>
                      Implementation of secure blockchain solutions for digital
                      certification
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Design and optimization of our mobile responsive interface
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Development of advanced search algorithms to enhance art
                      discovery
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Ongoing technological support and platform
                      evolutionpractices
                    </h3>
                  </div>
                </li>
              </ul>
              <p className="mt-4">
                The expertise provided by GENKX graduates ensures that
                Collectico remains at the vanguard of digital art commerce,
                offering collectors an unparalleled online experience that
                honors the integrity of fine art.
              </p>
            </div>
            {/*TECHNOLOGICAL EXCELLENCE IN SERVICE OF ART */}
            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold mb-4">
                TECHNOLOGICAL EXCELLENCE IN SERVICE OF ART
              </h2>
              <p>
                The support from Generation Thailand and GENKX has enabled
                Collectico to develop a platform that seamlessly integrates
                technological sophistication with artistic appreciation. Our
                sponsors understand that technology should enhance rather than
                overshadow the art experience—a philosophy that permeates every
                aspect of our digital platform.
              </p>
            </div>

            <div className="p-6 text-[#62483a]">
              <p className="mb-4">
                Key technological features made possible through this
                sponsorship include:
              </p>
              <ul className="space-y-4">
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>Museum-quality digital rendering of artworks</h3>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3">•</span>
                  <div>
                    <h3>
                      Secure payment infrastructure for high-value transactions
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Advanced data analytics for personalized collector
                      experiences
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Global accessibility with localized cultural sensitivity
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Artificial intelligence integration for art authentication
                      support
                    </h3>
                  </div>
                </li>
              </ul>
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold mb-4">
                A COMMITMENT TO THAILAND'S CULTURAL HERITAGE
              </h2>
              <p>
                Beyond technological support, our partnership with Generation
                Thailand and GENKX reflects a shared commitment to preserving
                and promoting Thailand's rich cultural heritage through digital
                innovation. Together, we are creating new pathways for artists,
                collectors, and cultural institutions to engage with art in the
                digital age.
                <p className="mt-4">
                  {" "}
                  <i>
                    "The fusion of technological innovation and artistic
                    tradition forms the cornerstone of Collectico's vision. We
                    are deeply grateful to Generation Thailand and GENKX for
                    their instrumental role in bringing this vision to
                    fruition."{" "}
                  </i>
                </p>
                <p className="mt-4">—The Collectico Founding Team</p>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CorporateSponsorshipPage;
