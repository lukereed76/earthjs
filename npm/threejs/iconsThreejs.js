export default function (jsonUrl, iconUrl) {
    /*eslint no-console: 0 */
    var _ = {sphereObject: null};

    function meshCoordinate(mesh, sc) {
        var phi = ( 90 - mesh.coordinates[1]) * 0.017453292519943295; //Math.PI / 180.0;
        var the = (360 - mesh.coordinates[0]) * 0.017453292519943295; //Math.PI / 180.0;

        mesh.position.x = sc * Math.sin(phi) * Math.cos(the);
        mesh.position.y = sc * Math.cos(phi);
        mesh.position.z = sc * Math.sin(phi) * Math.sin(the);
        mesh.lookAt({x:0,y:0,z:0});
    }

    function loadIcons() {
        var tj = this.threejsPlugin;
        if (!_.sphereObject) {
            var group = new THREE.Group();
            var SCALE = this._.proj.scale();
            _.data.features.forEach(function(data) {
                var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
                var mesh = new THREE.Mesh(geometry, _.material);
                mesh.coordinates = data.geometry.coordinates;
                meshCoordinate(mesh, SCALE+1);
                mesh.scale.set(6,6,1);
                group.add(mesh);
            })
            _.sphereObject = group;
            _.sphereObject.visible = this._.options.showIcons;
        }
        tj.addGroup(_.sphereObject);
        tj.rotate();
    }

    function init() {
        var this$1 = this;

        this._.options.showIcons = true;
        var loader = new THREE.TextureLoader();
        loader.load(iconUrl, function (map) {
            _.material = new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
                transparent: true,
                map: map
            });
            if (_.data && !_.loaded) {
                loadIcons.call(this$1);
            }
        });
    }

    function create() {
        if (_.material && !_.loaded) {
            loadIcons.call(this);
        }
    }

    function refresh() {
        if (_.sphereObject) {
            _.sphereObject.visible = this._.options.showIcons;
        }
    }

    return {
        name: 'iconsThreejs',
        urls: jsonUrl && [jsonUrl],
        onReady: function onReady(err, data) {
            this.iconsThreejs.data(data);
        },
        onInit: function onInit() {
            init.call(this);
        },
        onCreate: function onCreate() {
            create.call(this);
        },
        onRefresh: function onRefresh() {
            refresh.call(this);
        },
        data: function data(data$1) {
            if (data$1) {
                if (_.valuePath) {
                    var p = _.valuePath.split('.');
                    data$1.features.forEach(function (d) {
                        var v = d;
                        p.forEach(function (o) { return v = v[o]; });
                        d.geometry.value = v;
                    });
                }
                _.data = data$1;
            } else {
                return _.data;
            }
        },
        sphere: function sphere() {
            return _.sphereObject;
        }
    }
}