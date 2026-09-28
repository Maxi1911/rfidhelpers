// Initial default RFID Tag Prefix Mappings
export const DEFAULT_PREFIX_MAPPINGS = {
  '1B': { productId: 100100, productName: 'SINGLE BED SHEET', productCode: 'HSN-1', category: 'Linen' },
  '2B': { productId: 100105, productName: 'DOUBLE BED SHEET', productCode: 'HSN-6', category: 'Linen' },
  '1D': { productId: 100106, productName: 'SINGLE DUVET COVER', productCode: 'HSN-7', category: 'Linen' },
  '3D': { productId: 100107, productName: 'DOUBLE DUVET COVER', productCode: 'HSN-8', category: 'Linen' },
  'BB': { productId: 100102, productName: 'BATH TOWEL', productCode: 'HSN-3', category: 'Linen & Towels' },
  'HT': { productId: 100103, productName: 'HAND TOWEL', productCode: 'HSN-4', category: 'Linen & Towels' },
  'PM': { productId: 100104, productName: 'PILLOW CASE STANDARD', productCode: 'HSN-5', category: 'Bedding' },
};

/**
 * Dynamic map of active prefix mappings
 */
let activePrefixMappings = { ...DEFAULT_PREFIX_MAPPINGS };

export function getActivePrefixMappings() {
  return activePrefixMappings;
}

export function registerPrefixMapping(prefix, mappingObj) {
  const cleanPrefix = prefix.toUpperCase().trim();
  activePrefixMappings = {
    ...activePrefixMappings,
    [cleanPrefix]: mappingObj
  };
  return activePrefixMappings;
}

/**
 * Parses an RFID tag string (e.g. "1B10203", "BB99104", "HT40020")
 */
export function parseRfidTag(tagString, customMappings = activePrefixMappings) {
  if (!tagString || tagString.length < 2) {
    return null;
  }

  const prefix = tagString.substring(0, 2).toUpperCase();
  const numericSuffix = tagString.substring(2);
  const inventoryItemId = parseInt(numericSuffix, 10) || Math.floor(Math.random() * 90000 + 10000);

  const mappings = customMappings || activePrefixMappings;

  const mappedProduct = mappings[prefix] || {
    productId: 100999,
    productName: `CUSTOM PRODUCT (${prefix})`,
    productCode: `HSN-${prefix}`,
    category: 'General'
  };

  return {
    rfidTag: tagString,
    prefix,
    inventoryItemId,
    scannedAt: new Date().toISOString().substring(0, 19),
    rssi: -(Math.floor(Math.random() * 35 + 35)),
    ...mappedProduct
  };
}
