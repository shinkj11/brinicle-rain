import glsl from "glslify";

export const vertexShader = glsl`
  precision mediump float;

  varying vec2 vUv;

  uniform float uTime;

  void main() {
    vUv = uv;

    vec3 pos = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    // gl_PointSize = 10.0;  
  }
`;

export const fragmentShader = glsl`
  precision mediump float;

  uniform vec3 uColor;
  uniform float uTime;

  varying vec2 vUv;

  void main() {
    gl_FragColor = vec4(sin(vUv.x + uTime*0.5), 0.4, 1.0, 0.4);
  }
`;

export const fragmentShader2 = glsl`
  uniform vec3 iResolution;
  uniform float iTime;
  varying vec2 vUv;
  varying vec2 vPos;
  
  void mainImage( out vec4 o, vec2 u )
  {
      vec2 f = iResolution.xy;
      o = 0.*o + length(u = 9. * (u + u - f) / f.y) - 6.;
      
      for (float i, t = .1 * iTime; 
          i++ < 9.; 
          o += .5 * abs(f.x+f.y) * o.x) 
          u *= mat2(cos(t * cos(i) + i + vec4(sin(t), 1, 33, t*0.1))),
          f = cos(u.yx - cos(f)),
          u += .5 * f; // <- gets faster and faster     
      
      o = exp(2.5 / exp(1e-3 * o * o * vec4(7,3,1,30)) - 2.);
  }

  void main() {
    mainImage(gl_FragColor, iResolution.xy*vUv*vec2(2, 2) + vec2(-500, -100));
  }

`;

export const fragmentShader3 = glsl`
  uniform vec3 iResolution;
  uniform float iTime;
  uniform float hue1;
  uniform float hue2;
  uniform float speed;
  varying vec2 vUv;
  
  float smin( float d1, float d2, float k )
  {
      float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
      return mix( d2, d1, h ) - k*h*(1.0-h);
  }

  float gyroid (vec3 p) { return dot(cos(p),sin(p.yzx)); }

  float fbm(vec3 p)
  {
      float result = 100.;
      float a = .5;
      for (float i = 0.; i < 34.; ++i)
      {
          p.z += (result)*.6;
          p.z += iTime*speed;
          result = smin(result, abs(gyroid(p/a)*a), 1.5*a);
          a /= 1.6;
      }
      return result;
  }

  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
      vec2 uv = (2.*fragCoord-iResolution.xy)/iResolution.y;
      vec3 ray = normalize(vec3(uv,.1));
      vec3 color = 0.5 + 1. * cos(vec3(0,2,4)*hue1 + hue2 + fbm(ray) * 20.);

      fragColor = vec4(color,1);
      fragCoord += .5 * iResolution.xy;
  }

  void main() {
    mainImage(gl_FragColor, iResolution.xy*vUv);
  }
`;

export const fragmentShader4 = glsl`
uniform float iTime;
uniform vec2 iResolution; 
varying vec2 vUv;

  void main() {
    vec2 uv = -0.5 + 2.5 * (iResolution.xy*vUv + vec2(20, 20) ) / iResolution.xy;
    uv.x *= iResolution.x / iResolution.y;

    vec3 color = vec3(0.0);
    for( int i = 0; i < 128; i++ ) {
        float pha = sin(float(i) * 546.13 + 1.0) * 0.5 + 0.5;
        float siz = pow(sin(float(i) * 651.74 + 5.0) * 0.5 + 0.5, 4.0);
        float pox = sin(float(i) * 321.55 + 4.1) * iResolution.x / iResolution.y;
        float rad = 0.1 + 0.5 * siz + sin(pha + siz) / 4.0;
        vec2 pos = vec2(pox + sin(iTime / 7.0 + pha + siz), -1.0 - rad + (2.0 + 2.0 * rad) * mod(pha + 0.3 * (iTime / 1.0) * (0.2 + 0.8 * siz), 1.0));
        float dis = length(uv - pos);
        vec3 col = mix(vec3(0.194 * sin(iTime / 6.0) + 0.3, 0.2, 0.3 * pha), vec3(1.1 * sin(iTime / 9.0) + 0.3, 0.2 * pha, 0.4), 0.5 + 0.5 * sin(float(i)));
        float f = length(uv - pos) / rad;
        f = sqrt(clamp(1.0 + (sin(iTime * siz) * 0.5) * f, 0.0, 1.0));
        color += col.zyx * (1.0 - smoothstep(rad * 0.15, rad, dis));
    }

    color *= sqrt(1.5 - 0.5 * length(uv));
    gl_FragColor = vec4(color, 1.0);
  }
`;
