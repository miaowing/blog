import { Keystone } from "@keystonejs/keystone";
import { initUserModel } from "./user.model";
import { initSiteMetadataModel } from "./site-metadata.model";
import { initGalleryModel } from "./gallery.model";
import { initBannerModel } from "./banner.model";
import { initPostModel } from "./post.model";
import { initReceiverModel } from "./receiver.model";
import { initMessageModel } from "./message.model";

export function initModels(keystone: Keystone) {
    initUserModel(keystone);
    initSiteMetadataModel(keystone);
    initGalleryModel(keystone);
    initBannerModel(keystone);
    initPostModel(keystone);
    initReceiverModel(keystone);
    initMessageModel(keystone);
}