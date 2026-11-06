import React from 'react';
import { useStore } from '../context/StoreContext';
import { GROWER_SPOTLIGHTS, SOURCING_STEPS } from '../data/growers';
import { Leaf, HeartHandshake, ShieldCheck, MapPin, ArrowRight, Award, Compass, Sun } from 'lucide-react';

export const OurStoryPage: React.FC = () => {
  const { setActivePage, setSelectedCategoryFilter, setIsSettingsModalOpen } = useStore();

  return (
    <div className="space-y-16 pb-20">
      {/* Story Hero */}
      <section className="bg-[#1c382b] text-[#fbf9f4] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#264a39] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#264a39] text-[#c9d6cb] text-xs font-semibold">
            <Leaf className="w-3.5 h-3.5 text-[#8aa18e]" />
            <span>Root &amp; River Origin Chronicle</span>
          </div>

          <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15]">
            Bridging Ancient Village Roots with Conscious Modern Homes
          </h1>

          <p className="text-sm sm:text-base text-[#c9d6cb] leading-relaxed max-w-2xl mx-auto">
            Root &amp; River was born from a simple belief: the purest nourishment comes from soil nurtured by patient, generational care—not industrial speed. We exist to honor rural growers and protect traditional foodways.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#eef3ef] text-[#1c382b] flex items-center justify-center">
              <Sun className="w-6 h-6 text-[#59735d]" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#1c382b]">
              Living Soil Biology
            </h3>
            <p className="text-xs text-[#526f58] leading-relaxed">
              We partner with growers who enrich red loams and riverbanks using Jeevamrutha, cow-dung compost, and green leaf manuring rather than petroleum-based chemical inputs.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#eef3ef] text-[#1c382b] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6 text-[#59735d]" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#1c382b]">
              Direct Sourcing Alliances
            </h3>
            <p className="text-xs text-[#526f58] leading-relaxed">
              By working straight with rural collectives, tribal self-help groups, and family cottage mills, more value stays directly in village communities where the crops are tended.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#eef3ef] text-[#1c382b] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#59735d]" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#1c382b]">
              Truth in Labeling
            </h3>
            <p className="text-xs text-[#526f58] leading-relaxed">
              We do not invent certificates or make unsupported organic claims. Every batch displays real lot numbers, grower identities, and harvest dates with complete transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Sourcing Journey Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#bf563b]">
            Honest Practices
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1c382b]">
            The Journey from Soil to Jar
          </h2>
          <p className="text-xs text-[#526f58]">
            Discover the patient milestones behind every single product in our catalog.
          </p>
        </div>

        <div className="space-y-6">
          {SOURCING_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="p-6 sm:p-8 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#8aa18e] transition-all"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#f6f1e7] text-2xl flex items-center justify-center shrink-0 border border-[#e4dcce]">
                  {step.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-serif font-bold text-xs uppercase tracking-wider text-[#bf563b]">
                      Phase {step.step}
                    </span>
                    <span className="text-xs text-[#8aa18e]">&bull; {step.subtitle}</span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#1c382b]">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526f58] max-w-2xl leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grower Voices Extended */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#bf563b]">
            Direct Grower Stories
          </span>
          <h2 className="font-serif font-bold text-3xl text-[#1c382b]">
            The Guardians of Our Harvest
          </h2>
          <p className="text-xs text-[#526f58]">
            Real people with real roots across India's traditional agricultural belts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GROWER_SPOTLIGHTS.map((g) => (
            <div
              key={g.id}
              className="p-6 rounded-3xl bg-[#fffdfa] border border-[#e4dcce] flex flex-col sm:flex-row gap-6 items-start"
            >
              <img
                src={g.image}
                alt={g.name}
                className="w-full sm:w-40 h-48 rounded-2xl object-cover shrink-0 border border-[#e4dcce]"
              />
              <div className="space-y-3 flex-1">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#bf563b]">
                    {g.village}, {g.district}, {g.state}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#1c382b]">
                    {g.name}
                  </h3>
                  <span className="text-xs font-medium text-[#526f58]">
                    {g.specialty} &bull; {g.experience}
                  </span>
                </div>

                <p className="text-xs text-[#526f58] leading-relaxed">
                  {g.description}
                </p>

                <div className="p-3 rounded-xl bg-[#f6f1e7] border border-[#e4dcce] text-xs text-[#1c382b] italic">
                  &ldquo;{g.quote}&rdquo;
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sourcing Transparency & Regulatory Commitment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#eef3ef] border border-[#c9d6cb] space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1c382b]">
              Statutory Transparency Commitment
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1c382b]">
              Organic Claims &amp; Indian Regulatory Compliance
            </h2>
            <p className="text-xs sm:text-sm text-[#526f58] leading-relaxed">
              In accordance with FSSAI (Food Safety and Standards Authority of India) and NPOP (National Programme for Organic Production) standards, commercial organic claims require third-party certification and statutory Jaivik Bharat licensing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#264a39]">
            <div className="p-4 bg-white rounded-xl border border-[#c9d6cb] space-y-1">
              <strong className="block text-[#1c382b] font-serif text-sm">Jaivik Bharat &amp; NPOP</strong>
              <p className="text-[#526f58]">Full regulatory paperwork and accredited certification bodies must audit land and batch processing before labels are published.</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#c9d6cb] space-y-1">
              <strong className="block text-[#1c382b] font-serif text-sm">PGS-India Local Groups</strong>
              <p className="text-[#526f58]">Participatory Guarantee System records peer reviews among smallholder village farmers for local sustainable clusters.</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#c9d6cb] space-y-1">
              <strong className="block text-[#1c382b] font-serif text-sm">Prototype Disclosure</strong>
              <p className="text-[#526f58]">All certification entries in this prototype are functional placeholders designed for testing store workflows prior to commercial opening.</p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="text-xs font-semibold text-[#1c382b] hover:underline cursor-pointer"
            >
              Open Launch Readiness Guide &rarr;
            </button>
            <button
              onClick={() => {
                setSelectedCategoryFilter('all');
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-xl bg-[#1c382b] text-white text-xs font-semibold hover:bg-[#284c3b] transition-all cursor-pointer"
            >
              Explore Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
