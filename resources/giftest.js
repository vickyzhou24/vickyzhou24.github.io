
var app = Argon.init();
app.context.setDefaultReferenceFrame(app.context.localOriginEastUpSouth);


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera();
var userLocation = new THREE.Object3D;
scene.add(camera);
scene.add(userLocation);
var renderer = new THREE.WebGLRenderer({
    alpha: true,
    logarithmicDepthBuffer: true
});
renderer.setPixelRatio(window.devicePixelRatio);
app.view.element.appendChild(renderer.domElement);


var stats = new Stats();
hud.hudElements[0].appendChild(stats.dom);


app.context.updateEvent.addEventListener(function () {
    uniforms.amplitude.value = 1.0 + Math.sin(Date.now() * 0.001 * 0.5);
});


app.vuforia.isAvailable().then(function (available) {
 
    if (!available) {
        console.warn("vuforia not available on this platform.");
        return;
    }
   
    app.vuforia.init({
        encryptedLicenseData: "-----BEGIN PGP MESSAGE-----
Version: OpenPGP.js v2.3.2
Comment: http://openpgpjs.org

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
tQmw1Hd9BdsUM86EFXc=
=ANyr
-----END PGP MESSAGE-----"

}).then(function (api) {
}).catch(function (err) {
        console.log("vuforia failed to initialize: " + err.message);
    });
});
