import BuiltCard from "../components/BuiltCard";

export default function What() {
  return (
    <section className="what-page mx-auto w-full max-w-5xl px-6">
      <div className="flex">
        <h1 className="text-5xl text-black">I've built</h1>
        <h1 className="inline-block text-5xl bg-gradient-to-r from-black to-white bg-clip-text text-transparent">
          ....
        </h1>
      </div>

      <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <BuiltCard
          title="Deepity"
          description="A cross-platform HPC predictive coding library for GPUs and CPUs. The fastest around."
          image="/images/deepity.jpg"
          link="https://github.com/Deepity-HQ/Deepity"
        />
        <BuiltCard
          title="The Optimal City"
          description="A 10x10 grid, optimized using MILP and GurobiPy to minimize travel and building costs."
          image="/images/citylayout.png"
          link="https://github.com/Ra4ster/City-Optimization-ISE3230"
        />
        <BuiltCard
          title="Moderation Bot"
          description="A BERT moderation classifier built with a focus on HILP (human-in-the-loop)."
          image="/images/automod.png"
          link="https://github.com/Ra4ster/Automod-Classifier"
        />
      </div>
      <div className="flex">
        <h1 className="text-5xl text-black">I've written</h1>
        <h1 className="inline-block text-5xl bg-gradient-to-r from-black to-white bg-clip-text text-transparent">
          ....
        </h1>
      </div>

      <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <BuiltCard
          title="Truth is Conditional"
          description="A philosophical proposition of applying conditional beliefs to EUTs."
          image="https://images.unsplash.com/photo-1705995726505-1be3fc301ea6?auto=format&fit=crop&w=600&q=80"
          link="https://drive.google.com/file/d/1SPJ30Rx0_inN5TSkQtJ0MGWH8s9kXDpH/view"
        />
        <BuiltCard
          title="Insights into ETLs"
          description="Extracting 3D information from 2D scans of ETL electrolyzers using classical CV techniques."
          image="https://images.unsplash.com/photo-1608649787491-001904db1ce0?auto=format&fit=crop&w=600&q=80"
          link="/papers/computer_vision.pdf"
        />
        <BuiltCard
          title="EcoAudit Bayesian Analysis"
          description="Analyzing the reliability of a new ecological scanning approach using Gibbs Sampling."
          image="/images/Rplot.png"
          link="/papers/finalproject3303.pdf"
        />
      </div>
      <div className="flex">
        <h1 className="text-5xl text-black">I've learned</h1>
        <h1 className="inline-block text-5xl bg-gradient-to-r from-black to-white bg-clip-text text-transparent">
          ....
        </h1>
      </div>

      <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <BuiltCard
          title="Computer Vision"
          description="CSE5524: Computer Vision for Human-Computer Interaction"
          image="/images/Swiss_Roll_2.png"
          link="https://data-analytics.osu.edu/courses/cse/5524"
        />
        <BuiltCard
          title="Bayesian Analysis"
          description="STAT3303: Bayesian Analysis & Statistical Decision-Making"
          image="/images/predGraph.png"
          link="https://stat.osu.edu/courses/stat-3303"
        />
        <BuiltCard
          title="Data Mining and ML"
          description="CSE5243: Introduction to Data Mining"
          image="/images/PomereneHall.jpg"
          link="https://data-analytics.osu.edu/courses/cse/5243"
        />
      </div>
    </section>
  );
}
