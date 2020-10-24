import { Keystone } from "@keystonejs/keystone";
import { Checkbox, File, Text, Url } from "@keystonejs/fields";
import { Wysiwyg } from "@keystonejs/fields-wysiwyg-tinymce";
import { Markdown } from '@keystonejs/fields-markdown';
import { ossAdapter } from "../clients";
import { accessHelper } from "../helpers";
import { atTracking } from "@keystonejs/list-plugins";
import { Role } from "../constants/role.enum";

export function initPostModel(keystone: Keystone): void {
    keystone.createList('Post', {
        fields: {
            key: { type: Text },
            title: { type: Text },
            category: { type: Text },
            description: { type: Text, isMultiline: true } as any,
            author: { type: Text, label: '作者' },
            thumb: {
                type: File,
                adapter: ossAdapter,
                label: '缩略图',
            },
            cover: {
                type: File,
                adapter: ossAdapter,
                label: '封面图',
            },
            content: { type: Markdown },
            html_content: { type: Wysiwyg },
            publish: { type: Checkbox, label: '发布' },
            top: { type: Checkbox, label: '置顶' },
            source: { type: Text, label: '来源' },
            url: { type: Url },
        },
        plugins: [
            atTracking({
                createdAtField: 'createdAt',
                format: 'YYYY-MM-DD hh:mm'
            } as any),
        ],
        access: {
            read: accessHelper.access(Role.ADMIN, Role.ANONYMOUS),
            update: accessHelper.access(Role.ADMIN),
            create: accessHelper.access(Role.ADMIN),
            delete: accessHelper.access(Role.ADMIN),
            auth: false,
        },
        labelField: 'title',
    } as any);
}