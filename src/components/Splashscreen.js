import React, { useRef } from "react";
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
} from "react-icons/ri";

const SplashScreen = () => {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  // 3D Perspective Tilt on Mouse Movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

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
          <a href="#storage" className={classes.navLink}>
            Storage
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
            <span>Next-Gen Cloud Storage & Workspace</span>
          </div>

          <h1 className={classes.heroTitle}>
            Your Files. Anywhere. <br />
            <span className={classes.gradientText}>In Pure 3D Precision.</span>
          </h1>

          <p className={classes.heroDesc}>
            Put all your photos, documents, music, and high-definition video in a single blazing-fast workspace. Stream media instantly, collaborate across projects, and enjoy zero-latency cloud access.
          </p>

          <div className={classes.heroCtaGroup}>
            <button
              onClick={() => navigate("/auth")}
              className={classes.primaryCta}
            >
              <span>Get Started Free</span>
              <RiArrowRightLine size={18} />
            </button>

            <a href="#features" className={classes.secondaryCta}>
              <RiCompass3Line size={18} />
              <span>Explore Features</span>
            </a>
          </div>

          {/* Social Proof & Metrics Strip */}
          <div className={classes.heroStats}>
            <div className={classes.statItem}>
              <span className={classes.statNumber}>50 GB</span>
              <span className={classes.statLabel}>Free Cloud Quota</span>
            </div>
            <div className={classes.statItem}>
              <span className={classes.statNumber}>99.999%</span>
              <span className={classes.statLabel}>Data Durability</span>
            </div>
            <div className={classes.statItem}>
              <span className={classes.statNumber}>&lt; 5ms</span>
              <span className={classes.statLabel}>Streaming Latency</span>
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

              {/* Mac-style Window Controls */}
              <div className={classes.cardHeader}>
                <div className={classes.windowDots}>
                  <div className={classes.dotRed} />
                  <div className={classes.dotYellow} />
                  <div className={classes.dotGreen} />
                </div>
                <span className={classes.cardTag}>Cloud Workspace 3.0</span>
              </div>

              {/* Storage Meter Widget */}
              <div className={classes.storageWidget} id="storage">
                <div className={classes.storageHeader}>
                  <span className={classes.storageTitle}>Active Storage Vault</span>
                  <span className={classes.storageAmount}>14.8 GB / 50 GB Used</span>
                </div>
                <div className={classes.progressBar}>
                  <div className={classes.progressFill} />
                </div>
              </div>

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
                      <div className={classes.fileName}>Product_Roadmap_2026.pdf</div>
                      <div className={classes.fileMeta}>3.2 MB · Modified 2m ago</div>
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
                      <div className={classes.fileName}>Design_System_Assets.zip</div>
                      <div className={classes.fileMeta}>48.5 MB · Uploaded by team</div>
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
                      <div className={classes.fileMeta}>1.2 GB · Ready to Stream</div>
                    </div>
                  </div>
                  <div className={classes.fileStatus} style={{ color: "#38bdf8" }}>
                    ● Streaming
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
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feature Showcase Grid Section */}
      <section id="features" className={classes.featuresSection}>
        <div className={classes.featuresHeader}>
          <h2 className={classes.featuresSectionTitle}>
            Engineered For Seamless File Collaboration
          </h2>
          <p className={classes.featuresSectionSub}>
            Everything you need to backup files, organize project folders, and stream high-res media anywhere in the world.
          </p>
        </div>

        <div className={classes.featuresGrid}>
          {/* Feature 1 */}
          <motion.div
            className={classes.featureCard}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={classes.featureIcon}
              style={{ background: "rgba(2, 180, 165, 0.15)", color: "#04e9d6" }}
            >
              <RiHardDrive2Line />
            </div>
            <h3 className={classes.featureTitle}>Universal Cloud Storage</h3>
            <p className={classes.featureText}>
              Store documents, high-res photos, 4K videos, audio, and archives with automated cloud sync and instant recovery.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className={classes.featureCard}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={classes.featureIcon}
              style={{ background: "rgba(37, 99, 235, 0.15)", color: "#38bdf8" }}
            >
              <RiFolderZipLine />
            </div>
            <h3 className={classes.featureTitle}>Project-Centric Spaces</h3>
            <p className={classes.featureText}>
              Organize your assets into dedicated project vaults. Filter, sort, and search across thousands of files in milliseconds.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className={classes.featureCard}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={classes.featureIcon}
              style={{ background: "rgba(139, 92, 246, 0.15)", color: "#a78bfa" }}
            >
              <RiVideoLine />
            </div>
            <h3 className={classes.featureTitle}>Instant In-Browser Player</h3>
            <p className={classes.featureText}>
              Stream videos, listen to music tracks, and preview PDF or image documents right inside your browser with zero downloads.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            className={classes.featureCard}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={classes.featureIcon}
              style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}
            >
              <RiShareLine />
            </div>
            <h3 className={classes.featureTitle}>One-Click Sharing</h3>
            <p className={classes.featureText}>
              Share files and project folders via secure email invitations powered by FreelyEmail notifications and access controls.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modern Call to Action Banner */}
      <div className={classes.ctaBanner}>
        <div className={classes.ctaText}>
          <h3>Ready to elevate your cloud storage?</h3>
          <p>Get started with 50 GB of secure storage. No credit card required.</p>
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