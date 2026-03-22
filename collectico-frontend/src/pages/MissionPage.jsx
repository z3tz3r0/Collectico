import React from "react";
import BreadcrumbsNav from "../components/BreadcrumbsNav";

const MissionPage = () => {
  const links = [{ label: "Home", to: "/" }];
  return (
    <div className="w-screen bg-[#f0e0d0] px-4 py-2">
      <BreadcrumbsNav links={links} currentPage="Mission and History" />
      <div className=" max-w-5xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 text-[#62483a]">
            MISSION & HISTORY
          </h1>
          <h2 className="mb-4 font-bold text-[#62483a]">
            Our Collective Journey of Artistic Excellence
          </h2>
          <h2 className="mb-4 font-bold text-[#62483a]">OUR MISSION</h2>

          <p className="text-justify text-lg max-w-3xl mx-auto text-[#62483a]">
            Collectico exists as a distinguished marketplace where exceptional
            art finds its worthy patrons. We believe in creating meaningful
            connections between artists, collectors, and the cultural heritage
            they jointly preserve. Our platform transcends the transactional
            nature of art commerce to foster a community of appreciation,
            preservation, and enlightened collecting.
          </p>
        </header>

        <div className=" space-y-16 ">
          <section className=" bg-white rounded-lg shadow-lg">
            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold">OUR JOURNEY</h2>
            </div>
            <div className="p-6 text-[#62483a]">
              <ul className="space-y-4">
                <li className="flex">
                  <div>
                    <h3 className="font-bold">Conception (2020) </h3>
                    <p>
                      The idea for Collectico emerged during a fortuitous
                      meeting at Bangkok's Art Biennale. Our founders, connected
                      through various art circles, recognized a shared
                      frustration with existing platforms that either sacrificed
                      quality for volume or remained inaccessible to emerging
                      collectors.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">Foundation (2021) </h3>
                    <p>
                      Working from a converted warehouse in Bangkok's creative
                      district, our founding team spent months refining their
                      vision and building relationships with artists and
                      galleries. The platform was initially conceived as a
                      regional showcase for Southeast Asian art before expanding
                      its scope.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">Development (2022) </h3>
                    <p>
                      Collectico launched in beta with a carefully selected
                      portfolio of fifty exceptional pieces. This testing phase
                      allowed us to refine our technological infrastructure
                      while building a community of founding collectors who
                      shared our vision.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">Expansion (2023) </h3>
                    <p>
                      Following our successful launch, we expanded our
                      curatorial scope to include global artists while
                      maintaining our commitment to Asian art traditions. Our
                      membership program was introduced to provide enhanced
                      services to our most engaged collectors.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">Present (2024-2025) </h3>
                    <p>
                      Today, Collectico stands as a respected intermediary
                      between artists and collectors worldwide. Our platform now
                      features carefully selected works from emerging talents
                      alongside established masters, united by exceptional
                      quality and significance. While we have grown beyond our
                      original focus, our founding principles of authenticity,
                      transparency, and cultural stewardship remain unchanged.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className=" text-[#62483a] p-6">
              <p>
                "We created Collectico not merely to sell art, but to foster
                meaningful relationships between creators and those who
                appreciate their vision—relationships that honor both tradition
                and innovation."
              </p>
              <p>— The Founding Team</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MissionPage;
