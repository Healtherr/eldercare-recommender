ObjC.import("AppKit");
ObjC.import("CoreImage");
ObjC.import("Foundation");

function argFromEnd(offset) {
  const args = $.NSProcessInfo.processInfo.arguments;
  return ObjC.unwrap(args.objectAtIndex(args.count - offset));
}

const text = argFromEnd(2);
const outputPath = argFromEnd(1);

const data = $(text).dataUsingEncoding($.NSUTF8StringEncoding);
const filter = $.CIFilter.filterWithName("CIQRCodeGenerator");
filter.setValueForKey(data, "inputMessage");
filter.setValueForKey("M", "inputCorrectionLevel");

const baseImage = filter.outputImage;
const scaledImage = baseImage.imageByApplyingTransform($.CGAffineTransformMake(16, 0, 0, 16, 0, 0));
const rep = $.NSCIImageRep.imageRepWithCIImage(scaledImage);
const nsImage = $.NSImage.alloc.initWithSize(rep.size);
nsImage.addRepresentation(rep);

const width = Math.ceil(rep.size.width);
const height = Math.ceil(rep.size.height);
const bitmap = $.NSBitmapImageRep.alloc.initWithBitmapDataPlanesPixelsWidePixelsHighBitsPerSampleSamplesPerPixelHasAlphaIsPlanarColorSpaceNameBytesPerRowBitsPerPixel(
  null,
  width,
  height,
  8,
  4,
  true,
  false,
  $.NSDeviceRGBColorSpace,
  0,
  0
);

const graphicsContext = $.NSGraphicsContext.graphicsContextWithBitmapImageRep(bitmap);
$.NSGraphicsContext.saveGraphicsState;
$.NSGraphicsContext.setCurrentContext(graphicsContext);
$.NSColor.whiteColor.set;
$.NSBezierPath.fillRect($.NSMakeRect(0, 0, width, height));
nsImage.drawInRect($.NSMakeRect(0, 0, width, height));
$.NSGraphicsContext.restoreGraphicsState;

const pngData = bitmap.representationUsingTypeProperties($.NSBitmapImageFileTypePNG, $.NSDictionary.dictionary);

const ok = pngData.writeToFileAtomically(outputPath, true);
if (!ok) {
  throw new Error(`Unable to write QR image to ${outputPath}`);
}
