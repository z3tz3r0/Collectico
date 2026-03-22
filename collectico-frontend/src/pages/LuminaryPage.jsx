import React from "react";
import BreadcrumbsNav from "../components/BreadcrumbsNav";

const Luminarypage = () => {
  const links = [{ label: "Home", to: "/" }];
  return (
    <div className="w-screen bg-[#f0e0d0] px-4 py-2">
      <BreadcrumbsNav links={links} currentPage="Luminary" />
      <div className=" max-w-5xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 text-[#62483a]">
            LUMINARY FIGURES: VISIONARIES OF THE ART WORLD
          </h1>
          <h2 className="mb-4 font-bold text-[#62483a]">
            The Distinguished Patrons of Collectico
          </h2>

          <p className="text-justify text-lg max-w-3xl mx-auto text-[#62483a]">
            The art world has long been shaped by individuals whose vision,
            passion, and patronage elevate them beyond mere collectors to become
            true luminaries. These exceptional figures not only acquire
            masterpieces but foster artistic movements, nurture emerging talent,
            and preserve cultural heritage for future generations. At
            Collectico, our Luminary membership draws inspiration from these
            influential patrons whose legacies transcend ownership to become
            integral threads in art's evolving narrative.
          </p>
        </header>

        <div className=" space-y-16 ">
          {/* Premier Membership */}
          <section className=" bg-white rounded-lg shadow-lg">
            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold">VISIONARY COLLECTORS</h2>
            </div>
            <div className="p-6 text-[#62483a]">
              <ul className="space-y-4">
                <li className="flex">
                  <div>
                    <h3 className="font-bold">Isabella Stewart Gardner </h3>
                    <p>
                      transformed her passion for Renaissance art into a
                      cultural institution that continues to inspire. Her
                      methodical curation of European masterpieces alongside
                      contemporary works of her time demonstrated an intuitive
                      understanding of art's historical continuum.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">Peggy Guggenheim </h3>
                    <p>
                      revolutionized collecting by championing avant-garde
                      artists before their significance was widely recognized.
                      Her prescient support of abstract expressionists and
                      surrealists fundamentally altered the course of
                      20th-century art.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">The Medicis </h3>
                    <p>
                      exemplified how enlightened patronage can spark cultural
                      renaissance. Their sustained commitment to artists like
                      Michelangelo and Botticelli went beyond acquisition to
                      create an environment where artistic genius could flourish
                      unrestricted.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold">CONTEMPORARY LUMINARIES</h2>
              <p>
                Today's art luminaries continue this tradition while adapting to
                our global, interconnected world:
              </p>
            </div>
            <div className="p-6 text-[#62483a]">
              <ul className="space-y-4">
                <li className="flex">
                  <div>
                    <h3 className="font-bold">Eli and Edythe Broad </h3>
                    <p>
                      have shaped the cultural landscape through strategic
                      collecting focused on depth rather than breadth, acquiring
                      comprehensive holdings of select contemporary masters
                      while creating innovative public access to their
                      collection.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">Agnes Gund </h3>
                    <p>
                      demonstrates how collecting transcends aesthetics to
                      embrace social responsibility. Her Art for Justice Fund,
                      created by selling a prized Lichtenstein painting,
                      exemplifies how artistic patronage can address pressing
                      societal issues.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">Adrian Cheng </h3>
                    <p>
                      represents a new generation of visionary collectors
                      building cultural bridges between East and West through
                      thoughtfully curated collections that facilitate
                      cross-cultural dialogue and understanding.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold">THE LUMINARY APPROACH</h2>
              <p>
                What distinguishes these luminaries is not merely wealth or the
                caliber of their acquisitions, but their philosophical approach
                to collecting. True luminaries demonstrate:
              </p>
            </div>
            <div className="p-6 text-[#62483a]">
              <ul className="space-y-4">
                <li className="flex">
                  <div>
                    <h3 className="font-bold">• Curatorial Vision </h3>
                    <p>
                      Collecting with intellectual coherence that creates
                      dialogue between works
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">• Cultural Stewardship </h3>
                    <p>
                      Recognizing that exceptional art ultimately belongs to
                      humanity's shared heritage
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">• Discovery Instinct </h3>
                    <p className="mb-16">
                      The ability to recognize significance before consensus
                      forms
                    </p>
                    <p>
                      {" "}
                      <i>
                        "The true collector is not merely an owner, but a
                        temporary guardian of beauty and meaning."{" "}
                      </i>
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

export default Luminarypage;
