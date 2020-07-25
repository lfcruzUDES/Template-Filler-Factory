/// <reference path="../Models/Models.ts" />
/// <reference path="../GSS/sheet.ts" />
/// <reference path="../GSLIDE/Slides.ts" />
/// <reference path="../GDrive/Drive.ts" />
/// <reference path="../Settings.ts" />
/// <reference path="../GEmail/Email.ts" />


namespace EXECUTOR {

    type subs_data_type = {
        doc: GoogleAppsScript.Slides.Presentation,
        email: string,
        subject: string,
        msg: string
    }

    export function TakeOff() {
        const obj_templates = get_template_and_msg();
        const dataModel = MODELS.DataModelFullData();

        for (const row of dataModel.all()) {
            if (!row.datas.status) {
                let datas_processed = data_substitution(row.datas, obj_templates);
                if (row.datas.email) {
                    send_email(datas_processed);
                }
                row.datas.status = true;
                row.datas.url = datas_processed.doc.getUrl();
                row.save();
            }
        }
    }

    /**
     * Gets template and message selected.
     */
    function get_template_and_msg() {
        const models = [MODELS.TemplateModel(), MODELS.MsgModel()]
        let datas = [];
        for (const model of models) {
            const col_to_upper = model.col_as_array(4).map(el => [el.toUpperCase()]);
            model.overwrite_col(col_to_upper, 4);
            const data = model.get({ use: 'OK' })
            if (data) {
                datas.push(
                    data.datas
                )
            } else {
                throw new Error("Favor de seleccionar una plantilla y un mensaje.");

            }
        }

        return {
            template: SLIDE.conn(datas[0].url),
            folder: datas[0].folder,
            msg: break_line_to_paragraph(datas[1].msg, datas[1].format),
            subject: datas[1].subject,
        }
    }

    /**
     * Formats text.
     * @param txt : plain text
     * @param format : format in which the text will be formatted.
     */
    function break_line_to_paragraph(txt: string, format: string) {
        if (format === 'txt') return txt.split("\n").map(el => `<p>${el}</p>`).join('')
        return txt;
    }

    function data_substitution(datas: {}, templates: {}) {
        let subs_data: subs_data_type = {
            doc: '',
            email: <string>datas.email,
            subject: <string>templates.subject,
            msg: <string>templates.msg
        }
        let doc_name = `${SETTINGS.DEFAULT_DOC_NAME} ${SETTINGS.DOC_NAME_SEPARATOR} ${templates.template.getName()}`;
        if (datas.hasOwnProperty(SETTINGS.DOC_NAME)) {
            if (datas.doc_name.indexOf('__') >= 0) {
                doc_name = document_name(datas);
            }
        }
        const file = DRIVE.clone(
            doc_name,
            templates.template.getId(),
            templates.folder
        );
        file.setSharing(
            DriveApp.Access.ANYONE_WITH_LINK,
            DriveApp.Permission.VIEW
        );
        subs_data.doc = SLIDE.conn(file.getUrl());

        for (const key in datas) {
            let mark = `##${key}##`
            let regExpMarl = new RegExp(mark, "g")
            subs_data.doc.replaceAllText(mark, datas[key]);
            subs_data.subject = subs_data.subject.replace(regExpMarl, datas[key]);
            subs_data.msg = subs_data.msg.replace(regExpMarl, datas[key]);
        }

        return subs_data;
    }

    function send_email(subs_data: subs_data_type) {
        let html_btn = EMAIL.get_html_from_file(SETTINGS.BASE_BTN_TEMPLATE)
            .replace("##btn_name##", SETTINGS.BTN_NAME)
            .replace("##url##", subs_data.doc.getUrl());

        const msg = `${subs_data.msg}<br><br>${html_btn}`;

        let body_email = EMAIL.get_html_from_file(SETTINGS.BASE_EMAIL_TEMPLATE)
            .replace("##msg##", msg)
        EMAIL.send_email(subs_data.email, subs_data.subject, body_email);
    }

    function document_name(datas: {}) {
        let cols_to_name = datas[SETTINGS.DOC_NAME].split(SETTINGS.DOC_NAME_COL_SEPARATOR);
        let name = '';
        let counter = 0;
        for (const col of cols_to_name) {
            name += ` ${counter > 0 ? SETTINGS.DOC_NAME_SEPARATOR : ''} ${datas[col]}`;
            counter++;
        }

        return name.trim();
    }
}