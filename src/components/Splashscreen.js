import React, { useRef, useState } from "react";
import classes from "./Splashscreen.module.css";
import logoImage from "../images/my-cloud-mate-logo.gif";
import { useNavigate, Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  RiArrowRightLine,
  RiFlashlightLine,
  RiShieldCheckLine,
  RiFilePdfLine,
  RiFolderZipLine,
  RiCompass3Line,
  RiHardDrive2Line,
  RiVideoLine,
  RiShareLine,
  RiCheckLine,
  RiUploadCloud2Line,
  RiCloudLine,
  RiBroadcastLine,
  RiSparklingLine,
  RiCpuLine,
} from "react-icons/ri";

// Interactive 3D Tilt Feature Card Component
const FeatureCard3D = ({ icon, iconBg, iconColor, title, text, tag }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 18 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 18 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={classes.featureCard3D}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className={classes.featureCardGlow} />
      <div
        className={classes.featureIcon3D}
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <div className={classes.featureCardContent3D}>
        <div className={classes.featureCardHeaderRow}>
          <h3 className={classes.featureTitle}>{title}</h3>
          {tag && <span className={classes.featureTag}>{tag}</span>}
        </div>
        <p className={classes.featureText}>{text}</p>
      </div>
    </motion.div>
  );
};

const SplashScreen = () => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [perspectiveMode, setPerspectiveMode] = useState("isometric"); // isometric | frontal | deep3d

  // 3D Perspective Tilt on Mouse Movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Base angles by perspective mode
  const baseRotateX = perspectiveMode === "frontal" ? 4 : perspectiveMode === "deep3d" ? 20 : 12;
  const baseRotateY = perspectiveMode === "frontal" ? 0 : perspectiveMode === "deep3d" ? -20 : -12;

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${baseRotateX + 10}deg`, `${baseRotateX - 10}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`${baseRotateY - 10}deg`, `${baseRotateY + 10}deg`]
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={classes.container}>
      {/* Background Ambient Glow Orbs */}
      <motion.div
        className={classes.bgOrb1}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={classes.bgOrb2}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className={classes.bgOrb3} />

      {/* Floating Top Navigation */}
      <header className={classes.navbar}>
        <div className={classes.brandLink} onClick={() => navigate("/home")}>
          <div className={classes.brandLogo}>
            <img src={logoImage} alt="MyCloudMate Logo" />
          </div>
          <span className={classes.brandText}>
            MyCloud<span className={classes.brandMate}>Mate</span>
            <span className={classes.brandDot}>.</span>
          </span>
        </div>

        <nav className={classes.navLinks}>
          <a href="#features" className={classes.navLink}>
            Features
          </a>
          <a href="#vault" className={classes.navLink}>
            Cloud Vault
          </a>
          <a href="#security" className={classes.navLink}>
            Security
          </a>
        </nav>

        <Link to="/auth" className={classes.navCta}>
          Launch Drive →
        </Link>
      </header>

      {/* Main 3D Hero Section */}
      <section className={classes.heroSection}>
        {/* Left Column: Headline, Value Proposition & Actions */}
        <motion.div
          className={classes.heroLeft}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={classes.badgePill}>
            <span className={classes.pulseDot} />
            <span>Next-Gen Cloud Storage & Media Streaming</span>
          </div>

          <h1 className={classes.heroTitle}>
            Your Files. Anywhere. <br />
            <span className={classes.gradientText}>In Pure 3D Precision.</span>
          </h1>

          <p className={classes.heroDesc}>
            Unify photos, documents, codebases, and 4K media in an ultra-fast zero-latency workspace. Stream files instantly in-browser, organize project vaults, and enjoy end-to-end encrypted storage.
          </p>

          <div className={classes.heroCtaGroup}>
            <button
              onClick={() => navigate("/auth")}
              className={classes.primaryCta}
            >
              <span>Launch Workspace Free</span>
              <RiArrowRightLine size={18} />
            </button>

            <a href="#features" className={classes.secondaryCta}>
              <RiCompass3Line size={18} />
              <span>Explore Features</span>
            </a>
          </div>

          {/* Social Proof & Metrics Strip (No fake 50 GB) */}
          <div className={classes.heroStats}>
            <div className={classes.statItem}>
              <span className={classes.statNumber}>Zero-Knowledge</span>
              <span className={classes.statLabel}>End-to-End Encryption</span>
            </div>
            <div className={classes.statItem}>
              <span className={classes.statNumber}>Unlimited</span>
              <span className={classes.statLabel}>Workspaces & Vaults</span>
            </div>
            <div className={classes.statItem}>
              <span className={classes.statNumber}>99.999%</span>
              <span className={classes.statLabel}>High Durability Cluster</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Interactive Perspective Showcase */}
        <motion.div
          className={classes.heroRight}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
        >
          {/* 3D View Mode Selector */}
          <div className={classes.perspectiveSwitcher}>
            <span className={classes.perspectiveLabel}>
              <RiSparklingLine size={14} /> 3D View:
            </span>
            <button
              type="button"
              className={`${classes.perspectiveBtn} ${
                perspectiveMode === "isometric" ? classes.perspectiveBtnActive : ""
              }`}
              onClick={() => setPerspectiveMode("isometric")}
            >
              Isometric
            </button>
            <button
              type="button"
              className={`${classes.perspectiveBtn} ${
                perspectiveMode === "frontal" ? classes.perspectiveBtnActive : ""
              }`}
              onClick={() => setPerspectiveMode("frontal")}
            >
              Frontal
            </button>
            <button
              type="button"
              className={`${classes.perspectiveBtn} ${
                perspectiveMode === "deep3d" ? classes.perspectiveBtnActive : ""
              }`}
              onClick={() => setPerspectiveMode("deep3d")}
            >
              Deep 3D
            </button>
          </div>

          <div className={classes.stage3D}>
            {/* 3D Parallax Tilt Container */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className={classes.card3D}
            >
              <div className={classes.cardGlow} />

              {/* Mac-style Window Controls & 3D Hologram Badge */}
              <div className={classes.cardHeader}>
                <div className={classes.windowDots}>
                  <div className={classes.dotRed} />
                  <div className={classes.dotYellow} />
                  <div className={classes.dotGreen} />
                </div>

                {/* 3D Holographic Orbit Gyroscope Badge */}
                <div className={classes.holoCoreWrapper}>
                  <div className={classes.holoRingOuter} />
                  <div className={classes.holoRingInner} />
                  <RiCloudLine className={classes.holoCloudIcon} />
                  <span className={classes.holoLabel}>Live Multi-Cloud Vault</span>
                </div>

                <span className={classes.cardTag}>Engine v3.2</span>
              </div>

              {/* Multi-Cloud Distribution & Health Widget (Replacing hardcoded 50 GB) */}
              <div className={classes.storageWidget} id="vault">
                <div className={classes.storageHeader}>
                  <div className={classes.vaultStatusRow}>
                    <span className={classes.pulseDotSmall} />
                    <span className={classes.storageTitle}>Active Ecosystem Distribution</span>
                  </div>
                  <span className={classes.storageAmount}>Zero-Knowledge Encrypted</span>
                </div>

                {/* Multi-Segment Distribution Bar */}
                <div className={classes.distributionBar}>
                  <div className={classes.segMedia} title="Media Assets (48%)" />
                  <div className={classes.segDocs} title="Documents & PDFs (28%)" />
                  <div className={classes.segVaults} title="Code & Project Vaults (24%)" />
                </div>

                {/* Distribution Legend Tags */}
                <div className={classes.distLegend}>
                  <span className={classes.legendItem}>
                    <span className={classes.legendDotMedia} /> Media (48%)
                  </span>
                  <span className={classes.legendItem}>
                    <span className={classes.legendDotDocs} /> Documents (28%)
                  </span>
                  <span className={classes.legendItem}>
                    <span className={classes.legendDotVaults} /> Vaults (24%)
                  </span>
                </div>
              </div>

              {/* Interactive 3D Holographic Drag & Drop Station */}
              <motion.div
                className={classes.dropzone3D}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate("/auth")}
              >
                <div className={classes.dropzoneIconWrapper}>
                  <RiUploadCloud2Line size={24} />
                </div>
                <div className={classes.dropzoneText}>
                  <span className={classes.dropzoneTitle}>Interactive 3D Dropzone</span>
                  <span className={classes.dropzoneSub}>
                    Drop files anywhere to encrypt & stream • Zero compression
                  </span>
                </div>
                <span className={classes.dropzoneAction}>Upload</span>
              </motion.div>

              {/* Live Interactive Files List */}
              <div className={classes.fileGrid}>
                <div className={classes.fileItem}>
                  <div className={classes.fileInfo}>
                    <div
                      className={classes.fileIcon}
                      style={{ background: "rgba(239, 68, 68, 0.15)", color: "#f87171" }}
                    >
                      <RiFilePdfLine />
                    </div>
                    <div>
                      <div className={classes.fileName}>Product_Architecture_2026.pdf</div>
                      <div className={classes.fileMeta}>Encrypted Vault · Synchronized</div>
                    </div>
                  </div>
                  <div className={classes.fileStatus}>
                    <RiCheckLine size={14} /> Synced
                  </div>
                </div>

                <div className={classes.fileItem}>
                  <div className={classes.fileInfo}>
                    <div
                      className={classes.fileIcon}
                      style={{ background: "rgba(2, 180, 165, 0.15)", color: "#04e9d6" }}
                    >
                      <RiFolderZipLine />
                    </div>
                    <div>
                      <div className={classes.fileName}>Design_System_Tokens.zip</div>
                      <div className={classes.fileMeta}>Project Workspace · Multi-Cloud</div>
                    </div>
                  </div>
                  <div className={classes.fileStatus}>
                    <RiCheckLine size={14} /> Synced
                  </div>
                </div>

                <div className={classes.fileItem}>
                  <div className={classes.fileInfo}>
                    <div
                      className={classes.fileIcon}
                      style={{ background: "rgba(139, 92, 246, 0.15)", color: "#a78bfa" }}
                    >
                      <RiVideoLine />
                    </div>
                    <div>
                      <div className={classes.fileName}>Keynote_Demo_4K.mp4</div>
                      <div className={classes.fileMeta}>Direct Stream · Lossless P2P</div>
                    </div>
                  </div>
                  <div className={classes.fileStatus} style={{ color: "#38bdf8" }}>
                    <RiBroadcastLine size={14} /> Live Stream
                  </div>
                </div>
              </div>

              {/* Floating 3D Badge 1: Real-Time Sync Speed */}
              <motion.div
                className={classes.floatingBadgeSpeed}
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className={classes.speedIconWrapper}>
                  <RiFlashlightLine size={20} />
                </div>
                <div>
                  <div className={classes.badgeValue}>1.4 GB/s</div>
                  <div className={classes.badgeSub}>Fiber Upload Speed</div>
                </div>
              </motion.div>

              {/* Floating 3D Badge 2: AES-256 Encryption */}
              <motion.div
                className={classes.floatingBadgeSecurity}
                id="security"
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className={classes.securityIconWrapper}>
                  <RiShieldCheckLine size={22} />
                </div>
                <div>
                  <div className={classes.badgeValue}>AES-256 Bit</div>
                  <div className={classes.badgeSub}>Zero-Knowledge Encrypted</div>
                </div>
              </motion.div>

              {/* Floating 3D Badge 3: Lossless P2P Stream */}
              <motion.div
                className={classes.floatingBadgeP2P}
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className={classes.p2pIconWrapper}>
                  <RiCpuLine size={20} />
                </div>
                <div>
                  <div className={classes.badgeValue}>&lt; 5ms Direct</div>
                  <div className={classes.badgeSub}>P2P Edge Mesh</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feature Showcase Grid Section with 3D Tilt Cards */}
      <section id="features" className={classes.featuresSection}>
        <div className={classes.featuresHeader}>
          <div className={classes.badgePill} style={{ margin: "0 auto 16px" }}>
            <RiSparklingLine size={16} />
            <span>Interactive 3D Engine</span>
          </div>
          <h2 className={classes.featuresSectionTitle}>
            Engineered For Seamless File Collaboration
          </h2>
          <p className={classes.featuresSectionSub}>
            Hover across cards to explore real 3D depth, responsive tilt physics, and zero-compromise cloud security.
          </p>
        </div>

        <div className={classes.featuresGrid}>
          {/* Feature 1 */}
          <FeatureCard3D
            icon={<RiHardDrive2Line />}
            iconBg="rgba(2, 180, 165, 0.15)"
            iconColor="#04e9d6"
            title="Universal Cloud Vaults"
            text="Store photos, 4K media, PDFs, and deep archive datasets with zero compression loss and instant multi-region recovery."
            tag="3D Core"
          />

          {/* Feature 2 */}
          <FeatureCard3D
            icon={<RiFolderZipLine />}
            iconBg="rgba(37, 99, 235, 0.15)"
            iconColor="#38bdf8"
            title="Project-Centric Spaces"
            text="Organize team resources into isolated cryptographic vaults. Filter, tag, and locate any project file in sub-millisecond queries."
            tag="Vaults"
          />

          {/* Feature 3 */}
          <FeatureCard3D
            icon={<RiVideoLine />}
            iconBg="rgba(139, 92, 246, 0.15)"
            iconColor="#a78bfa"
            title="In-Browser Media Player"
            text="Stream 4K high-bitrate video, listen to lossless audio, and view document manifests directly in-browser with zero wait."
            tag="Lossless"
          />

          {/* Feature 4 */}
          <FeatureCard3D
            icon={<RiShareLine />}
            iconBg="rgba(16, 185, 129, 0.15)"
            iconColor="#34d399"
            title="Instant Secure Sharing"
            text="Share files and project directories with time-expiring cryptographic invitations, granular read/write permissions, and tracking."
            tag="Sharing"
          />
        </div>
      </section>

      {/* Modern Call to Action Banner (No fake 50 GB) */}
      <div className={classes.ctaBanner}>
        <div className={classes.ctaText}>
          <h3>Ready to elevate your cloud workspace?</h3>
          <p>Instant setup. Zero-knowledge encrypted vaults & lightning media streaming. Free forever.</p>
        </div>
        <button
          onClick={() => navigate("/auth")}
          className={classes.primaryCta}
          style={{ whiteSpace: "nowrap" }}
        >
          <span>Open MyCloudMate</span>
          <RiArrowRightLine size={18} />
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;