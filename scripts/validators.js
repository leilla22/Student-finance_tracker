const VALIDATORS = {
    
    centsPattern: /\.\d{2}\b/,
    
    
    beveragePattern: /(coffee|tea)/i,
    
    
    duplicatePattern: /\b(\w+)\s+\1\b/i
};

const Validators ={ 

    validateAmount(value) {
        const num = parseFloat(value);
        if (isNaN(num) || num < 0) {
            return { 
                isValid: false, 
                message: 'Amount must be a positive number' 
            };
        }
        if (!VALIDATORS.centsPattern.test(value.toFixed(2)) && value.toString().includes('.')) {
            return { 
                isValid: false, 
                message: 'Amount must have exactly 2 decimal places' 
            };
        }
        return { isValid: true, message: '' };
    },


    validateTitle(value) {
        if (!value.trim()) {
            return { 
                isValid: false, 
                message: 'Title cannot be empty' 
            };
        }
        if (VALIDATORS.duplicatePattern.test(value)) {
            return { 
                isValid: true, 
                message: '⚠️ Duplicate words detected in title', 
                warning: true 
            };
        }
        return { isValid: true, message: '' };
    },


    validateDate(value) {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            return { isValid: false, message: 'Invalid date format' };
        }
        return { isValid: true, message: '' };
    },


    detectBeverage(title) {
        return VALIDATORS.beveragePattern.test(title);
    }
};