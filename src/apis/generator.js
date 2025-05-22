import { http } from '@/utils/http'
import { className as noticeClassName } from '@/configs/noticeConfig'

const url = '/api/draw/submit'

/**
 * @param {object}
 * @param {string} productURL product image url
 * @param {string} backgroundURL background image url
 * @param {number} width width
 * @param {number} height height
 */
function advertisementApi ({ productURL, backgroundURL, width, height }) {
  return http({
    url,
    method: 'post',
    errMsg: 'Image generation failed. Please try again.',
    noticeClassName,
    data: {
      workflowKey: 'changing_background',
      params: {
        productURL,
        backgroundURL,
        width,
        height
      }
    }
  })
}

/**
 * @param {object}
 * @param {string} imageURL line drawing url
 * @param {string} colorURL background image url
 * @param {number} batchSize batchSize
 */
function lineArtApi ({ imageURL, colorURL, batchSize }) {
  return http({
    url,
    method: 'post',
    errMsg: 'Image generation failed. Please try again.',
    noticeClassName,
    data: {
      workflowKey: 'line_drawing',
      params: {
        imageURL,
        colorURL,
        batch_size: batchSize
      }
    }
  })
}

/**
 * @param {object}
 * @param {string} modelURL model image url
 * @param {string} clothesURL clothes image url
 */
function modelOutfitApi ({ modelURL, clothesURL }) {
  return http({
    url,
    method: 'post',
    errMsg: 'Image generation failed. Please try again.',
    noticeClassName,
    data: {
      workflowKey: 'changing_clothes',
      params: {
        modelURL,
        clothesURL
      }
    }
  })
}

/**
 * @param {object}
 * @param {string} imageURL product image url
 */
function refineProductApi ({ imageURL }) {
  return http({
    url,
    method: 'post',
    errMsg: 'Image generation failed. Please try again.',
    noticeClassName,
    data: {
      workflowKey: 'product_refinement',
      params: { imageURL }
    }
  })
}

/**
 * @param {object}
 * @param {string} imageURL 2D image url
 * @param {number} type style type
 * @param {number} batchSize batchSize
 */
function convert2DApi ({ imageURL, type, batchSize }) {
  return http({
    url,
    method: 'post',
    errMsg: 'Image generation failed. Please try again.',
    noticeClassName,
    data: {
      workflowKey: '2D_Translate_3D',
      params: { imageURL, type, batch_size: batchSize }
    }
  })
}

/**
 * @param {object}
 * @param {string} imageURL 2D image url
 * @param {number} type style type
 * @param {number} batchSize batchSize
 */

function assmblyParams (type) {
  const param = '[{"Lora_name":"风格1商业建筑.safetensors","Prompt":"cinematic film still,(partial close-up of the building:1.1),(masterpiece),(best quality:1.2),(ultra-high resolution:1.2),(realistic:1.2),(8k:1.2),sanely detailed,hyper quality,ultra detailed,clean sky,(no cloud:1.2),white tone,(slope, pe powuding:0.6),nonlinear,the interior of the building is filled with warm light,architectural form integrated into the environment,","Strength_model":"0.9"},{"Lora_name":"风格2现代酒店.safetensors","Prompt":"A photo of a modern hotel, (masterpiece), (best quality), contemporary architecture, black exterior walls, clean geometric design, expansive glass windows, harmonious mixed materials, integrated with natural surroundings, elegant landscaping, professional architectural photography, bright natural lighting","Strength_model":"0.85"},{"Lora_name":"风格3中国古镇.safetensors","Prompt":"photorealistic Chinese architecture, professional architectural rendering, ultra detailed design blueprint, ray tracing, physically based rendering, golden ratio composition, architectural visualization, accurate lighting simulation, realistic materials, detailed textures, precise shadow mapping, high dynamic range, 16K resolution, global illumination, ambient occlusion, subsurface scattering, professional photography, tilt-shift, architectural model, orthographic view, masterpiece, traditional Chinese palace, imperial aesthetics, meticulous craftsmanship, Octane render, high detail,","Strength_model":"0.5"},{"Lora_name":"风格4别墅度假酒店.safetensors","Prompt":"Holiday cottages in Billus, rustic-modern architecture, luxury countryside villa, traditional elements with modern twist, wooden beams, thatched roof details, garden with native plants, outdoor terrace with countryside views, natural materials, warm lighting, cozy interior glimpse, seamless indoor-outdoor living, sustainable design, rural setting, organic landscaping, tranquil atmosphere, handcrafted details, panoramic windows framing nature, soft earth tones, photorealistic rendering, architectural visualization, high detail, ","Strength_model":"0.55"}]'
  const json = JSON.parse(param)
  return json[type]
}

function architecturalRenderApi ({ imageURL, type, batchSize }) {
  const match = assmblyParams(type - 1)
  return http({
    url,
    method: 'post',
    errMsg: 'Image generation failed. Please try again.',
    noticeClassName,
    data: {
      workflowKey: 'architectural_render',
      params: { imageURL, type, batch_size: batchSize, Prompt: match.Prompt, Strength_model: match.Strength_model, Lora_name: match.Lora_name }
    }
  })
}

export {
  advertisementApi,
  lineArtApi,
  modelOutfitApi,
  refineProductApi,
  convert2DApi,
  architecturalRenderApi
}
