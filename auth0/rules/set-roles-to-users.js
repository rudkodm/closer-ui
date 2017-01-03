// Roles => user_metadata: { roles: ['admin' | 'merchant' | 'user']}
// 'admin' role should be added manually through the Auth0 manage page
function (user, context, callback) {
    user.user_metadata = user.user_metadata || {};

    var addRolesToUser = function(user, context,  cb) {
        var isAdminApp = context.clientName.indexOf('closer-admin-app') > -1;
        var isAdmin = !!user.user_metadata.roles && user.user_metadata.roles.indexOf("admin") > -1;
        var isNotAdmin = !isAdmin;
        if (isAdminApp && isNotAdmin) {
            cb(null, ['merchant']);
        } else {
            cb(null, user.user_metadata.roles);
        }
    };

    addRolesToUser(user, context, function(err, roles) {
        if (err) {
            callback(err);
        } else {
            user.user_metadata.roles = roles;
            auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
                .then(function(){
                    callback(null, user, context);
                })
                .catch(function(err){
                    callback(err);
                });
        }
    });
}