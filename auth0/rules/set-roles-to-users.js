// Roles => user_metadata: { roles: ['admin' | 'merchant' | 'user']}
// 'admin' role should be added manually through the Auth0 manage page
function (user, context, callback) {
    user.user_metadata = user.user_metadata || {};

    var addRolesToUser = function(user, context,  cb) {
        if (context.clientName.indexOf('closer-admin-app') > -1) {
            cb(null, ['merchant']);
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