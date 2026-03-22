import React from "react";
import BreadcrumbsNav from "../components/BreadcrumbsNav";
const MeetTeamMemberPage = () => {
  const links = [{ label: "Home", to: "/" }];
  return (
    <div className="w-screen bg-[#f0e0d0] px-4 py-2">
      <BreadcrumbsNav links={links} currentPage="Membership" />
      <div className=" max-w-5xl mx-auto px-4 ">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 text-[#62483a]">
            THE FOUNDERS' VISION
          </h1>

          <p className="text-justify text-lg max-w-3xl mx-auto text-[#62483a]">
            Collectico began as a shared vision among five friends with
            complementary expertise and a unified passion for democratizing
            access to fine art while maintaining uncompromising quality
            standards.
          </p>
        </header>

        <div className=" space-y-16 ">
          <section className=" bg-white rounded-lg shadow-lg">
            <div className="p-6 text-[#62483a]">
              <ul className="space-y-4">
                <li className="flex">
                  <div>
                    <h3 className="font-bold">"Nut" Tanut Ketrueang </h3>
                    <p className="text-justify">
                      brought his background in art authentication and curation
                      from his years at prestigious Bangkok galleries. His
                      discerning eye and encyclopedic knowledge of Southeast
                      Asian art traditions became the cornerstone of our
                      curatorial philosophy. As our Chief Curator, Nut
                      personally reviews each artwork before it joins our
                      platform, ensuring authenticity and artistic merit.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">"Mate" Poramate Prompun </h3>
                    <p className="text-justify">
                      contributed his technological innovation as a former
                      developer for leading luxury e-commerce platforms. His
                      vision for creating a secure, sophisticated digital
                      experience for high-value transactions provided
                      Collectico's technological foundation. As Chief Technology
                      Officer, Mate ensures our platform offers both flawless
                      functionality and elegant simplicity.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">"Ling" Kanokwan Sae-tae </h3>
                    <p className="text-justify">
                      leveraged her background in private banking to design our
                      unique financial models. Her insight into the investment
                      aspects of art collecting helped shape our approach to
                      valuation, market analysis, and collector services. As
                      Chief Financial Officer, Ling oversees our commission
                      structure and payment security protocols.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">“Aom” Suphol Inphrom </h3>
                    <p className="text-justify">
                      brought his expertise in international art law and
                      provenance research. Her methodical approach to
                      documentation and authentication established Collectico's
                      reputation for impeccable provenance records. As Legal
                      Director, Aom ensures compliance with international
                      regulations governing art sales while protecting both
                      artists and collectors.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div>
                    <h3 className="font-bold">
                      "Tib" Suntarinth Singhasinpongsaporn
                    </h3>
                    <p className="text-justify">
                      applied her background in luxury brand marketing to create
                      Collectico's distinctive visual identity and communication
                      style. His understanding of the psychology of discerning
                      collectors has shaped our entire customer experience. As
                      Creative Director, Tib oversees all aspects of
                      Collectico's brand presence and collector relationships.
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

export default MeetTeamMemberPage;
