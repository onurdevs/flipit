#!/usr/bin/env node
// Script to generate app icons for Android and iOS from a single source image
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceIcon = './icon.png';

// Android icon sizes
const androidSizes = [
  { folder: 'mipmap-mdpi', size: 48 },
  { folder: 'mipmap-hdpi', size: 72 },
  { folder: 'mipmap-xhdpi', size: 96 },
  { folder: 'mipmap-xxhdpi', size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
];

// iOS icon sizes
const iosSizes = [
  { name: 'Icon-20@2x.png', size: 40 },
  { name: 'Icon-20@3x.png', size: 60 },
  { name: 'Icon-29@2x.png', size: 58 },
  { name: 'Icon-29@3x.png', size: 87 },
  { name: 'Icon-40@2x.png', size: 80 },
  { name: 'Icon-40@3x.png', size: 120 },
  { name: 'Icon-60@2x.png', size: 120 },
  { name: 'Icon-60@3x.png', size: 180 },
  { name: 'Icon-1024.png', size: 1024 },
];

async function generateAndroidIcons() {
  console.log('🤖 Generating Android icons...');
  
  for (const { folder, size } of androidSizes) {
    const outputDir = path.join(__dirname, 'android', 'app', 'src', 'main', 'res', folder);
    
    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Generate square icon
    await sharp(sourceIcon)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(path.join(outputDir, 'ic_launcher.png'));
    
    // Generate round icon (same as square for now)
    await sharp(sourceIcon)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(path.join(outputDir, 'ic_launcher_round.png'));
    
    console.log(`  ✅ Generated ${folder} icons (${size}x${size})`);
  }
}

async function generateiOSIcons() {
  console.log('🍎 Generating iOS icons...');
  
  const outputDir = path.join(__dirname, 'ios', 'flipit', 'Images.xcassets', 'AppIcon.appiconset');
  
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  for (const { name, size } of iosSizes) {
    await sharp(sourceIcon)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(path.join(outputDir, name));
    
    console.log(`  ✅ Generated ${name} (${size}x${size})`);
  }
  
  // Generate Contents.json
  const contentsJson = {
    images: [
      { filename: 'Icon-20@2x.png', idiom: 'iphone', scale: '2x', size: '20x20' },
      { filename: 'Icon-20@3x.png', idiom: 'iphone', scale: '3x', size: '20x20' },
      { filename: 'Icon-29@2x.png', idiom: 'iphone', scale: '2x', size: '29x29' },
      { filename: 'Icon-29@3x.png', idiom: 'iphone', scale: '3x', size: '29x29' },
      { filename: 'Icon-40@2x.png', idiom: 'iphone', scale: '2x', size: '40x40' },
      { filename: 'Icon-40@3x.png', idiom: 'iphone', scale: '3x', size: '40x40' },
      { filename: 'Icon-60@2x.png', idiom: 'iphone', scale: '2x', size: '60x60' },
      { filename: 'Icon-60@3x.png', idiom: 'iphone', scale: '3x', size: '60x60' },
      { filename: 'Icon-1024.png', idiom: 'ios-marketing', scale: '1x', size: '1024x1024' },
    ],
    info: {
      author: 'xcode',
      version: 1,
    },
  };
  
  fs.writeFileSync(
    path.join(outputDir, 'Contents.json'),
    JSON.stringify(contentsJson, null, 2)
  );
  
  console.log('  ✅ Generated Contents.json');
}

async function main() {
  try {
    console.log('🎨 Starting icon generation from:', sourceIcon);
    
    // Check if source icon exists
    if (!fs.existsSync(sourceIcon)) {
      console.error('❌ Error: icon.png not found in project root!');
      console.error('   Please add a 1024x1024 PNG file named "icon.png"');
      process.exit(1);
    }
    
    await generateAndroidIcons();
    await generateiOSIcons();
    
    console.log('\n✨ All icons generated successfully!');
    console.log('📱 Android icons: android/app/src/main/res/mipmap-*/');
    console.log('🍎 iOS icons: ios/flipit/Images.xcassets/AppIcon.appiconset/');
    console.log('\n🚀 You can now rebuild your app to see the new icons!');
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

main();

