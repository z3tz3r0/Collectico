import React from "react";
import BreadcrumbsNav from "../components/BreadcrumbsNav";
const FinancialReportingPage = () => {
  const links = [{ label: "Home", to: "/" }];
  return (
    <div className="w-screen bg-[#f0e0d0] px-4 py-2">
      <BreadcrumbsNav links={links} currentPage="Financial Report" />
      <div className=" max-w-5xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 text-[#62483a]">
            FINANCIAL POLICY
          </h1>

          <p className="text-lg max-w-3xl mx-auto text-[#55453c] font-bold">
            Transparent Transactions in Fine Art Acquisition
          </p>
        </header>

        <div>
          <section className=" bg-white rounded-lg shadow-lg">
            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold mb-4">COMMISSION STRUCTURE</h2>
              <p>
                Collectico operates on a transparent commission models designed
                to facilitate exceptional art transactions while supporting our
                platform's curatorial standards and services. Our commission
                structure reflects the specialized nature of our marketplace and
                the comprehensive services we provide to both artists and
                collectors.
              </p>
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold ">Standard Commissions</h2>
            </div>
            <div className="p-6 text-[#312621]">
              <ul className="space-y-4">
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3> Primary Market Sales: 25% of the final sale price</h3>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3">•</span>
                  <div>
                    <h3>Secondary Market Sales: 15% of the final sale price</h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Auction Transactions: 20% buyer's premium in addition to
                      the hammer price
                    </h3>
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

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold">Commission Allocation</h2>
            </div>

            <div className="p-6 text-[#62483a]">
              <p className="mb-4">
                Our commission fees sustain the following essential services:
              </p>
              <ul className="space-y-4">
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>Authentication and provenance verification</h3>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3">•</span>
                  <div>
                    <h3>Secure payment processing</h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3> Artwork insurance during transit</h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3> Professional photography and documentation</h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3> Marketing and exhibition opportunities</h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3> Collector relationship management</h3>
                  </div>
                </li>
              </ul>
            </div>

            <div className="px-6">
              <hr />
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold mb-4">PAYMENT PROCEDURES</h2>
              <p>
                All financial transactions on Collectico utilize
                enterprise-grade encryption and comply with international
                financial security standards. We partner with established
                financial institutions to ensure maximum protection for all
                parties.
              </p>
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold ">Payment Methods</h2>
            </div>
            <div className="p-6 text-[#312621]">
              <ul className="space-y-4">
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Bank Wire Transfers (preferred for transactions above
                      $10,000)
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3">•</span>
                  <div>
                    <h3>
                      Major Credit Cards (Visa, Mastercard, American Express)
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>Escrow Services for high-value acquisitions</h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Cryptocurrency payments (Bitcoin, Ethereum) available for
                      select transactions
                    </h3>
                  </div>
                </li>
              </ul>
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold">Transaction Timeline</h2>
            </div>

            <div className="p-6 text-[#62483a]">
              <ul className="space-y-4">
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Purchase Confirmation: Immediate upon transaction
                      completion
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3">•</span>
                  <div>
                    <h3>
                      Funds Holding Period: 3 business days for verification
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Artist/Seller Payment: Within 14 business days of
                      successful delivery and acceptance
                    </h3>
                  </div>
                </li>
              </ul>
            </div>

            <div className="px-6">
              <hr />
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold mb-4">ACQUISITION FINANCING</h2>
              <p>
                For qualified collectors, Collectico offers flexible financing
                solutions through our banking partners. These arrangements allow
                for the immediate acquisition of significant works while
                accommodating various financial strategies.
              </p>
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold ">Financing Options</h2>
            </div>
            <div className="p-6 text-[#312621]">
              <ul className="space-y-4">
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3> 3-Month Interest-Free Collection Builder program</h3>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3">•</span>
                  <div>
                    <h3>
                      6-Month, 12-Month, and 24-Month extended payment plans
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Custom financing solutions for museum-quality acquisitions
                    </h3>
                  </div>
                </li>
              </ul>
              <p className="mt-4">
                All financing arrangements require credit approval and may
                involve additional documentation. Financing is not available for
                auction purchases, which require full payment within 5 business
                days of the auction close.
              </p>
            </div>

            <div className="px-6">
              <hr />
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold mb-4">RETURN POLICY</h2>
              <p>
                Collectico stands behind the authenticity and condition of every
                artwork. Our return policy balances the unique nature of art
                acquisition with appropriate consumer protections.
              </p>
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold mb-4">
                Condition Discrepancies
              </h2>
              <p>
                In the rare event that an artwork arrives in a condition
                materially different from its listing, collectors must notify
                Collectico within 48 hours of delivery. Our authentication team
                will assess the claim and facilitate appropriate resolution.
              </p>
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold mb-4">
                Authentication Guarantees
              </h2>
              <p>
                All works sold through Collectico carry a lifetime authenticity
                guarantee. Should an artwork ever be definitively proven to be
                inauthentic by a recognized authority, Collectico will provide a
                full refund of the purchase price.
              </p>
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold ">Cancellation Provisions</h2>
            </div>
            <div className="p-6 text-[#312621]">
              <ul className="space-y-4">
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Standard Purchase Cancellations: May be requested within
                      24 hours of purchase and before shipping for a full refund
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3">•</span>
                  <div>
                    <h3>
                      Commissioned Artworks: Subject to specific terms outlined
                      in the commission agreement
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Auction Purchases: Final upon winning bid confirmation,
                      not eligible for cancellation
                    </h3>
                  </div>
                </li>
              </ul>
            </div>

            <div className="px-6">
              <hr />
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold mb-4">TAX CONSIDERATIONS</h2>
              <p>
                Collectico complies with all applicable tax regulations in
                jurisdictions where we operate. While we provide general
                information, collectors should consult with their financial
                advisors regarding the specific tax implications of art
                acquisitions.
              </p>
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold ">Documentation Provided</h2>
            </div>
            <div className="p-6 text-[#312621]">
              <ul className="space-y-4">
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Detailed purchase invoices suitable for insurance and
                      taxation purposes
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3">•</span>
                  <div>
                    <h3>
                      Annual collection valuation statements for membership
                      clients
                    </h3>
                  </div>
                </li>
                <li className="flex">
                  <span className=" mr-3 ">•</span>
                  <div>
                    <h3>
                      Capital gains documentation for secondary market sales
                      when applicable
                    </h3>
                  </div>
                </li>
              </ul>
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold mb-4">
                International Transactions
              </h2>
              <p>
                Collectico facilitates customs documentation for international
                shipments but cannot assume responsibility for import duties,
                VAT, or other taxes imposed by local authorities. These remain
                the responsibility of the purchaser.
              </p>
            </div>

            <div className="px-6">
              <hr />
            </div>

            <div className=" text-[#62483a] p-6">
              <h2 className="text-2xl font-bold mb-4">PRIVACY & DISCRETION</h2>
              <p>
                We understand that financial privacy is essential to many
                collectors. All transaction information is maintained with
                strict confidentiality. Anonymous acquisition services are
                available for collectors who require additional discretion,
                subject to compliance with applicable financial regulations.
              </p>

              <p className="mt-4">
                {" "}
                <i>
                  Financial policies are subject to periodic review and
                  modification. All transactions are governed by the terms in
                  effect at the time of purchase.
                </i>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FinancialReportingPage;
