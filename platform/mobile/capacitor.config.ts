import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.corepi.app",
  appName: "CorePi",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
