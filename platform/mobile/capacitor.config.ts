import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.corepi.app",
  appName: "Corpi",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
