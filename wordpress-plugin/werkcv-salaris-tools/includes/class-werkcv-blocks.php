<?php

if (!defined('ABSPATH')) {
    exit;
}

class WerkCV_Salaris_Tools_Blocks {
    /**
     * @var WerkCV_Salaris_Tools_Renderer
     */
    private $renderer;

    public function __construct($renderer) {
        $this->renderer = $renderer;
    }

    public function register() {
        $build_dir = WERKCV_SALARIS_TOOLS_DIR . 'blocks/build/';
        $asset_path = $build_dir . 'index.asset.php';
        $script_path = $build_dir . 'index.js';

        if (!file_exists($asset_path) || !file_exists($script_path)) {
            return;
        }

        $asset = require $asset_path;

        wp_register_script(
            'werkcv-salaris-tools-blocks',
            WERKCV_SALARIS_TOOLS_URL . 'blocks/build/index.js',
            isset($asset['dependencies']) ? $asset['dependencies'] : array(),
            isset($asset['version']) ? $asset['version'] : WERKCV_SALARIS_TOOLS_VERSION,
            true
        );

        register_block_type(
            WERKCV_SALARIS_TOOLS_DIR . 'blocks/src/block-netto-bruto.json',
            array(
                'editor_script' => 'werkcv-salaris-tools-blocks',
                'render_callback' => function ($attributes) {
                    return $this->renderer->render('netto-bruto', (array) $attributes);
                },
            )
        );

        register_block_type(
            WERKCV_SALARIS_TOOLS_DIR . 'blocks/src/block-vakantiegeld.json',
            array(
                'editor_script' => 'werkcv-salaris-tools-blocks',
                'render_callback' => function ($attributes) {
                    return $this->renderer->render('vakantiegeld', (array) $attributes);
                },
            )
        );

        register_block_type(
            WERKCV_SALARIS_TOOLS_DIR . 'blocks/src/block-minimumloon.json',
            array(
                'editor_script' => 'werkcv-salaris-tools-blocks',
                'render_callback' => function ($attributes) {
                    return $this->renderer->render('minimumloon', (array) $attributes);
                },
            )
        );
    }
}
