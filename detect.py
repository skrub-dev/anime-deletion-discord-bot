import cv2
import sys
import os.path

def detect(filename, cascade_file = "./lbpcascade_animeface.xml"):
    if not os.path.isfile(cascade_file):
        raise RuntimeError("%s: not found" % cascade_file)

    cascade = cv2.CascadeClassifier(cascade_file)
    image = cv2.imread(filename, cv2.IMREAD_COLOR)
    gray = cv2.imread(filename, 0)
    gray = cv2.equalizeHist(gray)

    #gray = cv2.fastNlMeansDenoising(gray, None, 10, 7, 21)

    faces = cascade.detectMultiScale(gray,
                                     scaleFactor = 1.1,
                                     minNeighbors = 2,
                                     minSize = (8, 8))
    """ DEFAULT CONF
                                         scaleFactor = 1.1,
                                         minNeighbors = 5,
                                         minSize = (24, 24)
    """
    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)

    cv2.imwrite(sys.argv[2], image)
    print("{\"anime\": " + str(len(faces)) + "}")
    sys.exit(-1)

if len(sys.argv) != 3:
    sys.stderr.write("usage: detect.py <filename> <out>\n")
    sys.exit(-1)
    
detect(sys.argv[1])
