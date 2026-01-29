"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanTransformer = void 0;
class BooleanTransformer {
    // From database: 1 | 0 | Buffer | null to boolean | null
    from(value) {
        if (value === null) {
            return null;
        }
        // Handle Buffer for bit(1) columns (common in MySQL)
        if (typeof value === 'object' && value instanceof Buffer) {
            return value[0] === 1;
        }
        // Handle number for tinyint(1) or other numeric types
        return value === 1;
    }
    // To database: boolean | null to 1 | 0 | null
    to(value) {
        if (value === null) {
            return null;
        }
        return value ? 1 : 0;
    }
}
exports.BooleanTransformer = BooleanTransformer;
