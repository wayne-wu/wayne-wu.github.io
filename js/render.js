(function(){

    "use strict"

    // Utility functions
    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Do not run on mobile
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768){
        return;
    }

    // Prepare Element
    const el = document.getElementById("projects");

    // if ("undefined" != typeof Node && Node.TEXT_NODE)
    //     for (t = 0; t < el.childNodes.length; t++) {
    //         const e = el.childNodes[t];
    //         if (e.nodeType === Node.TEXT_NODE) {
    //             const t = document.createElement("span");
    //             t.textContent = e.textContent;
    //             e.parentElement.insertBefore(t, e);
    //             e.remove();
    //         }
    //     }
    for (let t = 0, e = 0; t < el.children.length; t++) (e = el.children[t]), "static" === getComputedStyle(e).position && (e.style.position = "relative"), "auto" === getComputedStyle(e).zIndex && (e.style.zIndex = 1);
        "static" === getComputedStyle(el).position && (el.style.position = "relative");

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
    el.appendChild(renderer.domElement);

    // Set render canvas style
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.zIndex = 0;
    renderer.domElement.style.top = 0;
    renderer.domElement.style.left = 0;
    renderer.domElement.style.background = "#000000";
    renderer.domElement.classList.add("render-canvas");

    // Set size
    var width, height;
    const setSize = function (){
        width = Math.max(el.offsetWidth, 200);
        height = Math.max(el.offsetHeight, 200);
    }
    setSize();
    renderer.setSize(width, height)

    // Settings
    var fgSphere = new THREE.Color(0x808080);  // sphere color
    // var fgLine = new THREE.Color(0x947c10);  // line color
    var fgLine = fgSphere;
    var bg = new THREE.Color(0x000000);  // background color
    const scale = 1;  // scale
    const n = 15;  // number of points
    const d = 15;  // spacing
    const maxD = 20;  // maximum distance for connection

    // Initialize Scene
    const scene = new THREE.Scene();
    scene.background = bg;

    var grp = new THREE.Group();
    grp.position.set(0,0,0);
    scene.add(grp);

    const i = n * n * 2;  // number of connection points
    var points = [];
    var linePositions = new Float32Array(i * i * 3);
    var lineColors = new Float32Array(i * i * 3);

    // Create Line Geometry
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors, blending: THREE.AdditiveBlending})
    var lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    grp.add(lineMesh);

    // Glow sprite
    var spriteMat = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load('../images/glow.png'),
        color: fgSphere,
        transparent: true,
        blending: THREE.AdditiveBlending
    })

    const genPoint = function(x, y, z){
        // Create a point geo at given position
        let r = rand(0.2, 0.4);
        const oGeo = new THREE.SphereGeometry(/*radius*/ r, /*wSegments*/ 12, /*hSegments*/ 12);
        const oMat = new THREE.MeshBasicMaterial({ color: fgSphere });
        let oMesh = new THREE.Mesh(oGeo, oMat);
        grp.add(oMesh);
        oMesh.position.set(x, y, z);
        oMesh.r = rand(-2, 2);
        let sprite = new THREE.Sprite(spriteMat);
        sprite.scale.set(5*r, 5*r, 1);
        oMesh.add(sprite);
        points.push(oMesh);
    }

    // Create points
    for (let i = 0; i <= n; i++){
        for (let j = 0; j <= n; j++){
            const x = (i-n/2)*d + rand(-5, 5);
            const y = (j-n/2)*d + rand(-5, 5);
            let z = rand(-3, 3);
            if(i % 2)
                z += 0.5 * d;
            genPoint(x, y - rand(5, 15), z);
            genPoint(x + rand(-5, 5), y + rand(5, 15), z + rand(-5, 5));
        }
    }

    // Camera
    const camera = new THREE.PerspectiveCamera( 25, width / height, 0.01, 1e4 );
    camera.position.set(100, 200, 300);
    scene.add(camera);

    // Lighting
    const lgt1 = new THREE.AmbientLight(16777215, 0.75);
    scene.add(lgt1);
    const lgt2 = new THREE.SpotLight(16777215, 1);
    lgt2.position.set(0, 200, 0);
    lgt2.distance = 400;
    lgt2.target = grp;
    scene.add(lgt2);

    // Control
    var mouseX = width/2;
    var mouseY = height/2;

    const onMouseMove = function(x, y){
        x /= width;
        y /= height;
        camera.oy || ((camera.oy = camera.position.y), (camera.ox = camera.position.x), (camera.oz = camera.position.z));
        const t = Math.atan2(camera.oz, camera.ox) + 2 * (x - 0.5);
        const e = Math.sqrt(camera.oz * camera.oz + camera.ox * camera.ox);
        camera.tz = e * Math.sin(t);
        camera.tx = e * Math.cos(t);
        camera.ty = camera.oy + 50 * (y - 0.5);
    }
    onMouseMove(mouseX, mouseY);

    const windowMouseMoveWrapper = function(event){
        const rect = renderer.domElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if(x >= 0 && y >= 0 && x <= rect.width && y <= rect.height)
        {
            mouseX = x;
            mouseY = y;
            onMouseMove(mouseX, mouseY);
        }
    }

    const windowTouchWrapper = function(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        if (1 === event.touches.length) {
            const x = event.touches[0].clientX - rect.left;
            const y = event.touches[0].clientY - rect.top;
            if(x >= 0 && y >= 0 && x <= rect.width && y <= rect.height)
            {
                mouseX = x;
                mouseY = y;
                onMouseMove(mouseX, mouseY);
            }
        }
    }

    const resize = function() {
        setSize(),
        camera && ((camera.aspect = width / height), "function" == typeof camera.updateProjectionMatrix && camera.updateProjectionMatrix()),
        renderer && (renderer.setSize(width, height), renderer.setPixelRatio(window.devicePixelRatio / scale));
    };
    resize();

    window.addEventListener("resize", resize);
    window.requestAnimationFrame(resize);
    window.addEventListener("mousemove", windowMouseMoveWrapper);
    window.addEventListener("scroll", windowMouseMoveWrapper);
    window.addEventListener("touchstart", windowTouchWrapper);
    window.addEventListener("touchmove", windowTouchWrapper);

    const isOnScreen = function() {
        const t = el.offsetHeight,
            e = el.getBoundingClientRect(),
            i = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop,
            s = e.top + i;
        return s - window.innerHeight <= i && i <= s + t;
    }

    var req;
    const animate = function () {
        req = requestAnimationFrame(animate);
        
        if(!isOnScreen)
            return;

        // Update camera movement 
        let dx = camera.tx - camera.position.x;
        let dy = camera.ty - camera.position.y;
        if (Math.abs(dx) > 0.01)
            camera.position.x += 0.02 * dx;
        if (Math.abs(dy) > 0.01)
            camera.position.y += 0.02 * dy;
        camera.lookAt(new THREE.Vector3(0,0,0))

        // Draw Lines
        let j = 0, k = 0, m = 0;
        for (let i = 0; i < points.length; i++)
        {
            const pt1 = points[i];
            if(pt1.r !== 0)
            {   
                let t = Math.atan2(pt1.position.z, pt1.position.x) + 25e-5 * pt1.r;
                let e = Math.sqrt(pt1.position.z * pt1.position.z + pt1.position.x * pt1.position.x);
                pt1.position.x = e * Math.cos(t);
                pt1.position.z = e * Math.sin(t);
            }   
            for(let l = i; l < points.length; l++)
            {
                const pt2 = points[l];
                let dist = pt1.position.distanceTo(pt2.position)
                if(dist < maxD){
                    let c = new THREE.Color(0).lerp(fgLine, 2*(1-(dist/maxD)));
                    linePositions[j++] = pt1.position.x;
                    linePositions[j++] = pt1.position.y;
                    linePositions[j++] = pt1.position.z;
                    linePositions[j++] = pt2.position.x;
                    linePositions[j++] = pt2.position.y;
                    linePositions[j++] = pt2.position.z;
                    lineColors[k++] = c.r;
                    lineColors[k++] = c.g;
                    lineColors[k++] = c.b;
                    lineColors[k++] = c.r;
                    lineColors[k++] = c.g;
                    lineColors[k++] = c.b;
                    m++;
                }
            }
        }
        lineMesh.geometry.setDrawRange(0, 2 * m);
        lineMesh.geometry.attributes.position.needsUpdate = true;
        lineMesh.geometry.attributes.color.needsUpdate = true;

        renderer.render( scene, camera );
    };

    const destroy = function() {
        window.removeEventListener("mousemove", windowMouseMoveWrapper);
        window.removeEventListener("scroll", windowMouseMoveWrapper);
        window.removeEventListener("touchstart", windowTouchWrapper);
        window.removeEventListener("touchmove", windowTouchWrapper);
        window.removeEventListener("resize", resize);
        window.cancelAnimationFrame(req);
        el.removeChild(renderer.domElement);
    }

    window.onbeforeunload = destroy;

    animate();

})();