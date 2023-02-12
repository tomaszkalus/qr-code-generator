import base64
import io
import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import SquareModuleDrawer
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from qrcode.image.styles.moduledrawers import CircleModuleDrawer
from qrcode.image.styles.moduledrawers import GappedSquareModuleDrawer
from qrcode.image.styles.colormasks import SolidFillColorMask
from PIL import ImageColor
import time

MODES = {
    "square": SquareModuleDrawer(),
    "rounded": RoundedModuleDrawer(),
    "circle": CircleModuleDrawer(),
    "gapped": GappedSquareModuleDrawer()
}

WHITE = "#ffffff"
BLACK = "#000000"

def generateQR_b64(text, style = None, fg = BLACK, bg = WHITE):
    st = time.time()

    if not style or not style in MODES:
        style = "square"

    qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=20,
    border=0)

    fg_rgb = ImageColor.getcolor(fg, "RGB")
    bg_rgb = ImageColor.getcolor(bg, "RGB")

    qr.add_data(text)
    qr.make(fit=True)

    img = qr.make_image(color_mask=SolidFillColorMask(bg_rgb, fg_rgb), image_factory=StyledPilImage, module_drawer=MODES[style])
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format=img.format)
    img_byte_arr = img_byte_arr.getvalue()

    b64 = base64.b64encode(img_byte_arr)
    et = time.time()    

    elapsed_time = (et - st) * 1000
    print('Execution time:', elapsed_time, 'ms')
    return b64.decode('ascii')

