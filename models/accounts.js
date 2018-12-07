const mongoose = require('mongoose');

const Database = new mongoose.Schema({
    pk : {
        type : Number,
        required : true,
        unique : true,
        index : true
    },
    TimeStamp : {
        type : Number,
        required : true,
        index : true
    },
    username : mongoose.Schema.Types.Mixed,
    full_name : mongoose.Schema.Types.Mixed,
    is_private : mongoose.Schema.Types.Mixed,
    profile_pic_url : mongoose.Schema.Types.Mixed,
    profile_pic_id : mongoose.Schema.Types.Mixed,
    is_verified : mongoose.Schema.Types.Mixed,
    has_anonymous_profile_picture : mongoose.Schema.Types.Mixed,
    media_count : mongoose.Schema.Types.Mixed,
    geo_media_count : mongoose.Schema.Types.Mixed,
    follower_count : mongoose.Schema.Types.Mixed,
    following_count : mongoose.Schema.Types.Mixed,
    following_tag_count : mongoose.Schema.Types.Mixed,
    biography : mongoose.Schema.Types.Mixed,
    external_url : mongoose.Schema.Types.Mixed,
    onboarding_configurations : mongoose.Schema.Types.Mixed,
    reel_auto_archive : mongoose.Schema.Types.Mixed,
    usertags_count : mongoose.Schema.Types.Mixed,
    is_favorite : mongoose.Schema.Types.Mixed,
    live_subscription_status : mongoose.Schema.Types.Mixed,
    is_interest_account : mongoose.Schema.Types.Mixed,
    has_chaining : mongoose.Schema.Types.Mixed,
    hd_profile_pic_versions : mongoose.Schema.Types.Mixed,
    hd_profile_pic_url_info : mongoose.Schema.Types.Mixed,
    mutual_followers_count : mongoose.Schema.Types.Mixed,
    has_highlight_reels : mongoose.Schema.Types.Mixed,
    include_direct_blacklist_status : mongoose.Schema.Types.Mixed,
    is_potential_business : mongoose.Schema.Types.Mixed,
    is_bestie : mongoose.Schema.Types.Mixed,
    has_unseen_besties_media : mongoose.Schema.Types.Mixed,
    show_account_transparency_details : mongoose.Schema.Types.Mixed,
    auto_expand_chaining : mongoose.Schema.Types.Mixed,
    highlight_reshare_disabled : mongoose.Schema.Types.Mixed
});

Database.index({
    pk : 1,
    TimeStamp : 1
})

module.exports = mongoose.model('Accounts', Database);
