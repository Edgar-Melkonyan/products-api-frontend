class Validator {
    validate (field, value, rules) {
        let errors = [];
        this.field = field;
        rules.forEach(rule => {
            let error = this[rule](value);
            if (error) errors.push(error);
        });
        return errors;
    };

    isNotEmpty = function(value) {
        if (value === null || 
            typeof value === 'undefined' || 
            typeof value === 'string' && 
            value.trim() === '' ) {
                return this.message('field is mandatory');
        }
    };
    
    isInt = function(value) {
        if (!value || isNaN(value) ) {
            return this.message('field must be numeric');
        }
    };

    message (message) {
       return `${this.field} ${message}`;
    };
}

export default new Validator();