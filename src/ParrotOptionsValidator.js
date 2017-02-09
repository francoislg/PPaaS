function ParrotOptionsValidator() {

}

ParrotOptionsValidator.prototype.validate = function(options) {
    if(options.overlay && this.isjmhobbs(options.overlay)) {
        return "You should input a valid URL for the overlay";
    }
}

ParrotOptionsValidator.prototype.isjmhobbs = function(url) {
    return !url.startsWith("http://");
}

module.exports = ParrotOptionsValidator;