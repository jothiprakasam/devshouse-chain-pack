"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as THREE from "three"; // Required for Vanta.js
import RINGS from "vanta/dist/vanta.rings.min";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.3, // Staggered appearance
      duration: 0.8,
      ease: "easeInOut",
    },
  }),
};

const securityFeatures = [
  { title: "Package Encryption", desc: "SHA-256 based hashing for integrity" },
  { title: "Decentralized Storage", desc: "Data stored on IPFS & Arweave" },
  { title: "Smart Contract Security", desc: "Ethereum-based verification" },
];

export default function SecurityAnimation() {
  const vantaRef = useRef(null);
  const router = useRouter(); // Initialize Next.js router

  useEffect(() => {
    if (!vantaRef.current) return;
    const effect = RINGS({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      backgroundColor: 0x0a0a0a, // Dark background
      color: 0x8b5cf6, // Use a single color for the rings
    });

    return () => effect.destroy(); // Cleanup on unmount
  }, []);

  return (
    <div
      ref={vantaRef}
      className="relative w-full min-h-screen flex flex-col items-center py-20"
    >
      <div className="relative z-10 text-center">
        <Badge className="text-lg bg-indigo-700 text-white">Chain Pack</Badge>
        <h1 className="text-5xl font-extrabold mt-4 bg-gradient-to-r from-cyan-400 to-violet-300 text-transparent bg-clip-text">
          Blockchain Package Protection
        </h1>

        {/* Our Solution */}
        <p className="mt-4 text-xl font-medium text-gray-200 max-w-3xl mx-auto">
          <span className="text-cyan-300">Our Solution</span>: A decentralized
          package manager leveraging blockchain and IPFS to ensure security,
          immutability, and transparency in software distribution.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <Button
            onClick={() => router.push("/auth/login")}
            className="px-6 py-3 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700"
          >
            Log In
          </Button>
          <Button
            onClick={() => router.push("auth/register")}
            className="px-6 py-3 text-lg font-semibold bg-cyan-600 hover:bg-cyan-700"
          >
            Register
          </Button>
        </div>

        {/* Animated Security Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-10">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <Card className="bg-gray-900 border border-gray-800 p-6 text-center shadow-lg shadow-cyan-500/20">
                <CardContent>
                  <h3 className="text-2xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mt-2">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mt-16 text-gray-300 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Tech Stack</h2>
        <p>
          <strong>Frontend:</strong> Next.js (App Router), ShadCN, TailwindCSS,
          Framer Motion
        </p>
        <p>
          <strong>Web3 Integration:</strong> Wagmi, ethers.js
        </p>
        <p>
          <strong>Authentication:</strong> NextAuth.js (Web2), SIWE (Web3)
        </p>
        <p>
          <strong>Backend:</strong> Orkes, Node.js, Express.js, Prisma, MongoDB
        </p>
        <p>
          <strong>Smart Contracts:</strong> Solidity (Ethereum/Polygon)
        </p>
        <p>
          <strong>File Storage:</strong> IPFS / Arweave
        </p>
        <p>
          <strong>Microservices:</strong> Package Registry, Crypto Transactions,
          Decentralized Identity, Package Verification
        </p>
      </div>
    </div>
  );
}
