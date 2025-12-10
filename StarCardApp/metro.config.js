const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Ensure Metro can bundle .sql and .sqlite files referenced via require()
if (!config.resolver) config.resolver = {};
const currentAssetExts = config.resolver.assetExts || [];
config.resolver.assetExts = Array.from(new Set([...currentAssetExts, "sql", "sqlite"]));

module.exports = withNativeWind(config, { input: "./app/globals.css" });