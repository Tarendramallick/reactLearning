'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Hero from '@/components/Hero';
import WhyLearn from '@/components/WhyLearn';
import RoadmapCTA from '@/components/RoadMap';
import { Navbar } from '@/components/Navbar';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#050816]">

      {/* HEADER */}

      {!isAuthenticated ? (
        <main>

          <Navbar />
          <Hero />
          <WhyLearn />
          <RoadmapCTA />
        </main>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <Navbar />
          <WhyLearn />
          <RoadmapCTA />
          <h3 className="text-3xl font-bold text-white mb-8">
            Learning Modules
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                title: "React Fundamentals",
                desc: "Learn JSX, components, and props",
                color: "blue",
              },
              {
                title: "Component Mastery",
                desc: "Advanced component patterns",
                color: "green",
              },
              {
                title: "State & Props",
                desc: "useState, events, lifting state",
                color: "yellow",
              },
              {
                title: "Advanced Hooks",
                desc: "useEffect, useContext, custom hooks",
                color: "pink",
              },
              {
                title: "Styling & Performance",
                desc: "Optimization & UI polish",
                color: "indigo",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className={`bg-slate-800/50 border-slate-700 hover:border-${item.color}-500 transition cursor-pointer`}
                onClick={() => router.push('/courses')}
              >
                <CardHeader>
                  <CardTitle className="text-white">{item.title}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {item.desc}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button variant="outline" className="w-full">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}

          </div>
        </div>
      )}
    </div>
  );
}