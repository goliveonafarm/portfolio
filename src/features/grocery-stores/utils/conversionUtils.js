const conversions = {
    oz: size => size,
    lb: size => size * 16,
    g: size => size * 0.03527396195,
    kg: size => size / 1000,
    cup: size => size * 8,
    pt: size => size * 16,
    qt: size => size * 32,
    gal: size => size * 128,
    floz: size => size,
    mL: size => size * 0.033814023,
    L: size => size * 33.814,
    unit: size => size
};

export const convertToPricePerOz = (cost, size, sizeType) => {
    const convert = conversions[sizeType];
    return convert ? (cost / convert(size)) : cost;
};