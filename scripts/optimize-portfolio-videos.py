#!/usr/bin/env python3
"""Re-encode the existing cropped video presentations; preserve every original.
Requires ffmpeg/ffprobe. Does not alter crop coordinates, dimensions or timing.
"""
from pathlib import Path
from hashlib import sha256
import json, subprocess, tempfile
ROOT = Path(__file__).resolve().parents[1]
for name in ['elevenOasisDemo.json', 'elevenOasisMobileDemo.json']:
    path = ROOT / 'src/components/eleven-oasis' / name
    data = json.loads(path.read_text())
    original = data.get('optimizedFrom', data['src'])
    source = ROOT / 'public' / original.lstrip('/')
    with tempfile.TemporaryDirectory(prefix='portfolio-video-') as directory:
        output = Path(directory) / 'optimized.mp4'
        subprocess.run(['ffmpeg', '-v', 'error', '-i', str(source), '-map', '0:v:0', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(output)], check=True)
        payload = output.read_bytes()
        target = source.with_stem(source.stem + '-web-' + sha256(payload).hexdigest()[:12])
        target.write_bytes(payload)
        def video_info(file):
            return json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,avg_frame_rate,nb_frames,duration', '-of', 'json', str(file)]))['streams'][0]
        assert video_info(source) == video_info(target), 'Video geometry or timing changed'
        data.update(src='/' + target.relative_to(ROOT / 'public').as_posix(), optimizedFrom=original,
                    encoding={'codec': 'H.264', 'crf': 23, 'pixelFormat': 'yuv420p', 'fastStart': True, 'audio': False})
        path.write_text(json.dumps(data, indent=2) + '\n')
        print(f'{name}: {source.stat().st_size:,} → {len(payload):,} bytes')
