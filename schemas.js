const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.threadSchema = Joi.object({
    thread: Joi.object({
        // author: Joi.string().required().escapeHTML(),
        title: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array()
});

module.exports.issueSchema = Joi.object({
    post: Joi.object({
        // author: Joi.string().required(),
        
        id: Joi.integer().escapeHTML(),
        title: Joi.string().escapeHTML(),
        body: Joi.string().escapeHTML(),    
        priority: Joi.integer().escapeHTML(),
        raised_by: Joi.string(),
        assignee: Joi.string(),
        status: Joi.string(),
        created_at: Joi.string(),
        contributors: Joi.array()
    }).required(),
    image: Joi.array()
})

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required().escapeHTML()
    }).required()
})