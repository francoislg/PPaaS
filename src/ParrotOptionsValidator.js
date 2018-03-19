function ParrotOptionsValidator() {

}

ParrotOptionsValidator.prototype.validate = function(options) {
    if(options.overlay && this.isjmhobbs(options.overlay)) {
        return "You should input a valid URL for the overlay";
    }
    if(options.colors) {
        const invalidColors = options.colors.split(",").filter(color => !/[0-9A-F]/ig.test(color));
        if (invalidColors.length > 0) {
            return `The following colors do not have the HEX color format: ${invalidColors.join("\n")}`;
        }
    }
}

ParrotOptionsValidator.prototype.isjmhobbs = function(url) {
    return !url.startsWith("http");
}

module.exports = ParrotOptionsValidator;
