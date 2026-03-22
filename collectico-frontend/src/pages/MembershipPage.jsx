import React from "react";
import BreadcrumbsNav from "../components/BreadcrumbsNav";

const MembershipPage = () => {
  const links = [{ label: "Home", to: "/" }];

  return (
    <div className="w-screen bg-[#f0e0d0] px-4 py-2">
      <BreadcrumbsNav links={links} currentPage="Membership" />
      <div className=" max-w-5xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-8 text-[#62483a]">
            COLLECTICO MEMBERSHIP BENEFITS
          </h1>

          <p className="text-justify text-lg max-w-3xl mx-auto text-[#62483a]">
            At Collectico, we believe that membership transcends mere
            transaction—it signifies entrance into a distinguished community of
            connoisseurs and collectors. Our tiered membership program has been
            meticulously designed to elevate your art acquisition experience
            through privileged access and bespoke services.
          </p>
        </header>

        <div className="membership-tiers space-y-16">
          {/* Premier Membership */}
          <section className=" bg-white rounded-lg shadow-lg">
            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold">PREMIER MEMBERSHIP</h2>
              <p className="font-medium">Annual Fee: $950</p>
            </div>
            <div className="p-6 text-[#62483a]">
              <ul className="space-y-4">
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">Private Viewing Sessions</h3>
                    <p>
                      Arrange exclusive appointments with our art specialists to
                      view selected pieces before they enter the public market
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3">•</span>
                  <div>
                    <h3 className="font-bold">Invitation-Only Auctions</h3>
                    <p>
                      Gain entry to our most prestigious auction events
                      featuring rare masterpieces not available through standard
                      channels
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">Collector's Concierge</h3>
                    <p>
                      Benefit from personalized guidance from our expert
                      curators to build a collection that reflects your
                      discerning taste
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">Provenance Authentication</h3>
                    <p>
                      Receive comprehensive authentication reports and detailed
                      provenance documentation with each acquisition
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">
                      Complimentary Insurance Valuation
                    </h3>
                    <p>
                      Annual valuation of your collection for insurance purposes
                      at no additional cost
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">Acquisition Priority</h3>
                    <p>
                      Exercise first-right-of-refusal on newly listed artworks
                      within your specified preferences
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Connoisseur Membership */}
          <section className=" bg-white rounded-lg shadow-lg  text-[#62483a]">
            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold">CONNOISSEUR MEMBERSHIP</h2>
              <p className="font-medium">Annual Fee: $2,450</p>
            </div>
            <div className=" p-6">
              <p className="font-bold mb-4">All Premier benefits, plus:</p>
              <ul className="space-y-4">
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">Bespoke Collection Planning</h3>
                    <p>
                      Consultation with master curators to develop a strategic
                      acquisition roadmap tailored to your aesthetic vision and
                      investment objectives
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">Artist Studio Visits</h3>
                    <p>
                      Exclusive opportunities to meet renowned artists in their
                      creative environments
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">
                      International Art Fair VIP Access
                    </h3>
                    <p>
                      Complimentary passes and private tours at select global
                      art exhibitions and fairs
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">Restoration Services</h3>
                    <p>
                      Preferential rates for our museum-standard conservation
                      and restoration services
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">Collection Management</h3>
                    <p>
                      Comprehensive digital cataloging and condition monitoring
                      of your entire collection
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">
                      Global Transportation Logistics
                    </h3>
                    <p>
                      White-glove shipping coordination for international
                      acquisitions with expedited customs clearance
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Luminary Membership */}
          <section className=" bg-white rounded-lg shadow-lg  text-[#62483a]">
            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold">LUMINARY MEMBERSHIP</h2>
              <p className="font-medium">Annual Fee: $5,950</p>
            </div>
            <div className=" p-6">
              <p className="font-bold mb-4">All Connoisseur benefits, plus:</p>
              <ul className="space-y-4">
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">Limited Edition Acquisitions</h3>
                    <p>
                      Priority access to exceptionally limited works with
                      historically significant provenance
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">Private Vernissage Events</h3>
                    <p>
                      Personal invitations to intimate gatherings with artists
                      and notable collectors
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">Home Integration Consultation</h3>
                    <p>
                      Expert guidance on optimal display, lighting, and
                      environmental conditions for your acquisitions
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">Dedicated Collection Steward</h3>
                    <p>
                      A personal curator assigned to your collection available
                      for consultation at your convenience
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">Legacy Planning Services</h3>
                    <p>
                      Specialized advisory on collection inheritance planning
                      and philanthropic opportunities
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3 className="font-bold">Art Portfolio Diversification</h3>
                    <p>
                      Strategic consultation on building a balanced collection
                      with appreciation potential
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Call to Action Section */}
        <section className=" mt-16 p-8 bg-gray-50 rounded-lg shadow-md text-[#62483a]">
          <h2 className="text-2xl font-bold mb-4">BECOME A MEMBER</h2>
          <p className="mb-6">
            To discuss membership options and initiate your journey with
            Collectico, please contact our Membership Liaison:
          </p>

          <div className=" flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <p>
                <strong>Telephone:</strong> +1 (212) 555-7890
              </p>
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <p>
                <strong>Email:</strong> membership@collectico.com
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm italic">
            Membership benefits are subject to terms and conditions. Collectico
            reserves the right to modify offerings at its discretion.
          </p>
        </section>
      </div>
    </div>
  );
};

export default MembershipPage;
