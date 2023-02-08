function hexToRgb(hex) {
    var aRgbHex = hex.slice(1).match(/.{1,2}/g);
    return {
      r: parseInt(aRgbHex[0], 16),
      g: parseInt(aRgbHex[1], 16),
      b: parseInt(aRgbHex[2], 16)
    };
  }
  
function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function calculate_contrast_ratio(fg, bg){
    const fg_rgb = hexToRgb(fg);
    const bg_rgb = hexToRgb(bg);

    const color1luminance = luminance(fg_rgb.r, fg_rgb.g, fg_rgb.b);
    const color2luminance = luminance(bg_rgb.r, bg_rgb.g, bg_rgb.b);

    const ratio = (color1luminance > color2luminance) ? ((color2luminance + 0.05) / (color1luminance + 0.05)) : ((color1luminance + 0.05) / (color2luminance + 0.05));
    return ratio;
}

export default {calculate_contrast_ratio} ;