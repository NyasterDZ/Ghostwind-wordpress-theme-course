const {registerBlockType} = wp.blocks
const {RichText} = wp.editor

registerBlockType('gw/block-test', {
    title: 'block test',

    description: 'A simple custom block for Gutenberg',

    icon: 'image-rotate-right',

    category: 'text',

    attributes: {
        title: {
            type: 'string'
        },
        description: {
            type: "string"
        }
    },

    edit({attributes, setAttributes}){
        const updateTitle = (newTitle) => {
            setAttributes({title: newTitle})
        }

        const updateDescription = (newDescription) => {
            setAttributes({description: newDescription})
        }
        return (
            <div>
                <RichText
                    tagName="h1"
                    placeholder= "Enter your title"
                    onChange={updateTitle}
                    value={attributes.title}
                />
                <RichText
                    tagName="p"
                    placeholder= "Enter your description"
                    onChange={updateDescription}
                    value={attributes.description}
                />
            </div>
        );
    },

    save({attributes}){
        const {title, description} = attributes
        return (
            <div>
                <h1> {title} </h1>
                <h2> {description} </h2>
            </div>
        );
    }

})