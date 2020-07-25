/// <reference path="../Models/Models.ts" />


namespace BUILDER {

    /**
     * Creates project tables.
     */
    export function crate_tables() {
        const models = [MODELS.DataModel(), MODELS.TemplateModel(), MODELS.MsgModel()];

        for (const model of models) {
            const verbose_names = model.cols.map(el => el.verbose_name);
            const range = model.sheet.getRange(1, 1, 1, verbose_names.length)
            range.setValues([verbose_names]);
            range.setFontWeight("bold");
            model.sheet.autoResizeColumns(1, verbose_names.length);
        }
    }


}